import express, { Router } from "express";

import { createLoanController } from "./loanController";
import { loanApplicationSchema } from "./loanSchemas";
import { validateData } from "../middleware/validationMiddleware";
import LoanService from "../service/LoanService";

export const createLoanRouter = (loanService: LoanService): Router => {
  const loanController = createLoanController(loanService);
  const loanRouter = express.Router();

  loanRouter.get("/loans", loanController.getLoans);
  loanRouter.get("/loans/:id", loanController.getLoanById);
  loanRouter.post(
    "/loans",
    validateData(loanApplicationSchema),
    loanController.submitLoan,
  );
  loanRouter.put(
    "/loans/:id",
    validateData(loanApplicationSchema),
    loanController.updateLoan,
  );
  loanRouter.delete("/loans/:id", loanController.deleteLoan);
  return loanRouter;
};
