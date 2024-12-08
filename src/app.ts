import express, { Express } from "express";

import { createLoanRouter } from "./api/loanRouter";
import LoanService from "./service/LoanService";

export const createApp = (loanService: LoanService): Express => {
  const app: Express = express();
  app.use(express.json());
  app.use(createLoanRouter(loanService));

  return app;
};
