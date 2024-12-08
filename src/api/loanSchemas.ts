import { z } from "zod";

import { LoanType } from "../service/loanTypes";

/**
 * @openapi
 * components:
 *   schemas:
 *     LoanApplicationInput:
 *       type: object
 *       required:
 *         - applicantName
 *         - loanType
 *         - loanAmount
 *         - interestRate
 *       properties:
 *         applicantName:
 *           type: string
 *         loanType:
 *           type: string
 *           enum: [Car, Personal]
 *         loanAmount:
 *           type: number
 *           minimum: 0
 *           exclusiveMinimum: true
 *           maximum: 500,000
 *         income:
 *           type: number
 *         interestRate:
 *           type: number
 */
export const loanApplicationSchema = z.strictObject({
  applicantName: z.string(),
  loanType: z.nativeEnum(LoanType),
  loanAmount: z.number().gt(0).lt(500_000),
  income: z.number().optional(),
  interestRate: z.number(),
});
