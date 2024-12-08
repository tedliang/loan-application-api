import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Identifiable } from "../service/loanTypes";
import LoanService from "../service/LoanService";

export function createLoanController(loanService: LoanService) {
  return {
    getLoans: async function (req: Request, res: Response) {
      const loans = await loanService.getAllLoans();
      res.status(StatusCodes.OK).json(loans);
    },

    getLoanById: async function (req: Request<Identifiable>, res: Response) {
      const loan = await loanService.getLoanById(req.params.id);
      if (loan) {
        res.status(StatusCodes.OK).json(loan);
      } else {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    },

    submitLoan: async function (req: Request, res: Response) {
      const response = await loanService.submitLoan(req.body);
      res.status(StatusCodes.CREATED).json(response);
    },

    updateLoan: async function (req: Request<Identifiable>, res: Response) {
      const response = await loanService.updateLoan(req.params.id, req.body);
      if (response) {
        res.status(StatusCodes.OK).json(response);
      } else {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    },

    deleteLoan: async function (req: Request<Identifiable>, res: Response) {
      const deleted = await loanService.deleteLoan(req.params.id);
      res.sendStatus(deleted ? StatusCodes.NO_CONTENT : StatusCodes.NOT_FOUND);
    },
  };
}
