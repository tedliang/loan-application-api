import { v4 as uuidv4 } from "uuid";
import {
  LoanApplication,
  LoanApplicationRequest,
  LoanApplicationResponse,
  LoanType,
} from "./loanTypes";
import LoanRepository from "../repository/LoanRepository";

export default class LoanService {
  constructor(private loanRepository: LoanRepository) {}

  async getAllLoans(): Promise<LoanApplication[]> {
    return await this.loanRepository.findAll();
  }

  async getLoanById(id: string): Promise<LoanApplication | undefined> {
    return await this.loanRepository.findById(id);
  }

  async submitLoan(
    request: LoanApplicationRequest,
  ): Promise<LoanApplicationResponse> {
    const id = uuidv4();
    const loan = await this.loanRepository.create({ id, ...request });
    return { id, monthlyPayment: this.getMonthlyPayment(loan) };
  }

  async updateLoan(
    id: string,
    request: LoanApplicationRequest,
  ): Promise<LoanApplicationResponse | undefined> {
    const newLoan = await this.loanRepository.update({ id, ...request });
    return newLoan && { id, monthlyPayment: this.getMonthlyPayment(newLoan) };
  }

  async deleteLoan(id: string): Promise<boolean> {
    const deletedLoan = await this.loanRepository.delete(id);
    return !!deletedLoan;
  }

  private getMonthlyPayment(loan: LoanApplication): number {
    return this.calculateMonthlyPayment(
      loan.loanAmount,
      loan.interestRate,
      loan.loanType === LoanType.Car ? 5 : 3,
    );
  }

  private calculateMonthlyPayment(
    loanAmount: number,
    interestRate: number,
    loanTerm: number,
  ): number {
    const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly and percentage to dec
    const numberOfPayments = loanTerm * 12; // Convert term in years to number of monthly payments
    // Calculate monthly payment using the formula
    return (
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    );
  }
}
