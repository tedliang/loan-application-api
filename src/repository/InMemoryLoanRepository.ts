import LoanRepository from "./LoanRepository";
import { LoanApplication } from "../service/loanTypes";

export class InMemoryLoanRepository implements LoanRepository {
  private loans: LoanApplication[] = [];

  async findAll(): Promise<LoanApplication[]> {
    return this.loans;
  }

  async findById(id: string): Promise<LoanApplication | undefined> {
    return this.loans.find((loan) => loan.id === id);
  }

  async create(loan: LoanApplication): Promise<LoanApplication> {
    this.loans.push(loan);
    return loan;
  }

  async update(loan: LoanApplication): Promise<LoanApplication | undefined> {
    const index = this.loans.findIndex(({ id }) => id === loan.id);
    if (index === -1) {
      return undefined;
    }
    this.loans[index] = loan;
    return loan;
  }

  async delete(id: string): Promise<LoanApplication | undefined> {
    const index = this.loans.findIndex((loan) => loan.id === id);
    if (index === -1) {
      return undefined;
    }
    return this.loans.splice(index, 1)[0];
  }
}
