import express, { Router } from "express";

import { createLoanController } from "./loanController";
import { loanApplicationSchema } from "./loanSchemas";
import { validateData } from "../middleware/validationMiddleware";
import LoanService from "../service/LoanService";

const loanRoutes = (loanService: LoanService): Router => {
  const loanController = createLoanController(loanService);
  const loanRouter = express.Router();

  /**
   * @openapi
   * /loans:
   *   get:
   *     tags:
   *       - Loan
   *     description: Retrieve a list of all loan applications
   *     responses:
   *       200:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/LoanApplication'
   */
  loanRouter.get("/loans", loanController.getLoans);

  /**
   * @openapi
   * /loans/{id}:
   *   get:
   *     tags:
   *       - Loan
   *     description: Retrieve a single loan application by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the loan application to retrieve
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoanApplication'
   *       404:
   *         description: loan application not found
   */
  loanRouter.get("/loans/:id", loanController.getLoanById);

  /**
   * @openapi
   * /loans:
   *   post:
   *     tags:
   *       - Loan
   *     description: Submit a new loan application
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoanApplicationInput'
   *     responses:
   *       201:
   *         description: created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoanApplicationResponse'
   */
  loanRouter.post(
    "/loans",
    validateData(loanApplicationSchema),
    loanController.submitLoan,
  );

  /**
   * @openapi
   * /loans/:id:
   *   put:
   *     tags:
   *       - Loan
   *     description: Update an existing loan application by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the loan application to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoanApplicationInput'
   *     responses:
   *       200:
   *         description: successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoanApplicationResponse'
   *       400:
   *         description: bac request
   *       404:
   *        description: loan application not found
   */
  loanRouter.put(
    "/loans/:id",
    validateData(loanApplicationSchema),
    loanController.updateLoan,
  );

  /**
   * @openapi
   * /loans/:id:
   *   delete:
   *     tags:
   *       - Loan
   *     description: Delete an existing loan application by its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the loan application that needs to be deleted
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: no content
   *       404:
   *        description: loan application not found
   */
  loanRouter.delete("/loans/:id", loanController.deleteLoan);

  return loanRouter;
};

export default loanRoutes;
