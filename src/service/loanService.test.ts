import { LoanApplicationRequest, LoanType } from "./loanTypes";
import LoanService from "./LoanService";
import { InMemoryLoanRepository } from "../repository/InMemoryLoanRepository";

describe("Loan Service", () => {
  const loanService = new LoanService(new InMemoryLoanRepository());
  beforeEach(() => jest.clearAllMocks());

  describe("getAllLoans", () => {
    it("should return empty list initially", async () => {
      const result = await loanService.getAllLoans();
      expect(result).toHaveLength(0);
    });

    it("should return a list of all loan applications when loan exist", async () => {
      const response = await loanService.submitLoan(applicationRequest);
      const result = await loanService.getAllLoans();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: response.id, ...applicationRequest });
    });
  });

  describe("getLoanById", () => {
    it("should return loan application when loan exist", async () => {
      const response = await loanService.submitLoan(applicationRequest);
      const result = await loanService.getLoanById(response.id);
      expect(result).toEqual({ id: response.id, ...applicationRequest });
    });

    it("should return undefined when loan not exist", async () => {
      const result = await loanService.getLoanById("not-exist");
      expect(result).toBeUndefined();
    });
  });

  describe("submitLoan", () => {
    it("should return loan application response", async () => {
      const response = await loanService.submitLoan(applicationRequest);
      expect(response.id).not.toBeUndefined();
      expect(response.monthlyPayment).toEqual(773.312061177131);
    });
  });

  describe("updateLoan", () => {
    it("should return loan application response", async () => {
      const { id } = await loanService.submitLoan(applicationRequest);
      const response = await loanService.updateLoan(id, {
        ...applicationRequest,
        loanType: LoanType.Personal,
        loanAmount: 60000,
      });
      expect(response?.id).not.toBeUndefined();
      expect(response?.monthlyPayment).toEqual(1825.3162470933423);
    });

    it("should return undefined when loan not exist", async () => {
      const result = await loanService.updateLoan(
        "not-exist",
        applicationRequest,
      );
      expect(result).toBeUndefined();
    });
  });

  describe("deleteLoan", () => {
    it("should return true when loan is deleted", async () => {
      const { id } = await loanService.submitLoan(applicationRequest);
      const result = await loanService.deleteLoan(id);
      expect(result).toBeTruthy();
    });

    it("should return undefined when loan not exist", async () => {
      const result = await loanService.deleteLoan("not-exist");
      expect(result).toBeFalsy();
    });
  });
});

export const applicationRequest: LoanApplicationRequest = {
  applicantName: "Ted",
  loanType: LoanType.Car,
  loanAmount: 40000,
  interestRate: 6,
};
