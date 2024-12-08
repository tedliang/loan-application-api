import { LoanApplication } from "../service/loanTypes";

export default interface LoanRepository {
  findAll(): Promise<LoanApplication[]>;
  findById(id: string): Promise<LoanApplication | undefined>;
  create(loan: LoanApplication): Promise<LoanApplication>;
  update(loan: LoanApplication): Promise<LoanApplication | undefined>;
  delete(id: string): Promise<LoanApplication | undefined>;
}
