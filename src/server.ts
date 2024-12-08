import dotenv from "dotenv";
import { Express } from "express";

import { createApp } from "./app";
import { InMemoryLoanRepository } from "./repository/InMemoryLoanRepository";
import LoanService from "./service/LoanService";

dotenv.config();
const port = process.env.PORT || 3000;
const loanService = new LoanService(new InMemoryLoanRepository());
const app: Express = createApp(loanService);

/* Start the Express app and listen for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
