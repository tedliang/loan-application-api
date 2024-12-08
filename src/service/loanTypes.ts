export type Identifiable = {
  id: string;
};

export enum LoanType {
  Car = "Car",
  Personal = "Personal",
}

export type LoanApplication = Identifiable & {
  applicantName: string;
  loanType: LoanType;
  loanAmount: number;
  income?: number;
  interestRate: number;
};

export type LoanApplicationRequest = Omit<LoanApplication, "id">;

export type LoanApplicationResponse = Identifiable & {
  monthlyPayment: number;
};
