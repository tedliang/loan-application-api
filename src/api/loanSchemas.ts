import { z } from "zod";

import { LoanType } from "../service/loanTypes";

export const loanApplicationSchema = z.strictObject({
  applicantName: z.string(),
  loanType: z.nativeEnum(LoanType),
  loanAmount: z.number().gt(0).lt(500_000),
  income: z.number().optional(),
  interestRate: z.number(),
});
