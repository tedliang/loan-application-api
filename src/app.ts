import express, { Express } from "express";

import loanRoutes from "./api/loanRoutes";
import { setupSwagger } from "./utils/swagger";
import LoanService from "./service/LoanService";

export const createApp = (loanService: LoanService): Express => {
  const app: Express = express();
  app.use(express.json());
  app.use(loanRoutes(loanService));
  setupSwagger(app);

  return app;
};
