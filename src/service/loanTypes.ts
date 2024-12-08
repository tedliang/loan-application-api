export type Identifiable = {
  id: string;
};

export enum LoanType {
  Car = "Car",
  Personal = "Personal",
}

/**
 * @openapi
 * components:
 *   schemas:
 *     LoanApplication:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         applicantName:
 *           type: string
 *         loanType:
 *           type: string
 *           enum: [Car, Personal]
 *         loanAmount:
 *           type: number
 *         income:
 *           type: number
 *         interestRate:
 *           type: number
 */
export type LoanApplication = Identifiable & {
  applicantName: string;
  loanType: LoanType;
  loanAmount: number;
  income?: number;
  interestRate: number;
};

export type LoanApplicationRequest = Omit<LoanApplication, "id">;

/**
 * @openapi
 * components:
 *   schemas:
 *     LoanApplicationResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         monthlyPayment:
 *           type: number
 */
export type LoanApplicationResponse = Identifiable & {
  monthlyPayment: number;
};
