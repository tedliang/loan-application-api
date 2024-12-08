import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import request from "supertest";

import { createApp } from "../app";
import { InMemoryLoanRepository } from "../repository/InMemoryLoanRepository";
import { LoanApplication, LoanType } from "../service/loanTypes";
import { applicationRequest } from "../service/loanService.test";
import LoanService from "../service/LoanService";

describe("Loan Rest API", () => {
  const loanService = new LoanService(new InMemoryLoanRepository());
  const app = createApp(loanService);

  beforeEach(() => jest.clearAllMocks());
  const { arrayContaining, objectContaining } = expect;

  describe("GET /loans", () => {
    it("should return a list of all loan applications", async () => {
      const mockedGetAllLoans = jest.spyOn(loanService, "getAllLoans");
      mockedGetAllLoans.mockResolvedValue([application]);

      const { status, body } = await request(app).get("/loans");

      expect(status).toBe(StatusCodes.OK);
      expect(body).toEqual([application]);
    });
  });

  describe("GET /loans/:id", () => {
    const id = uuidv4();
    const url = `/loans/${id}`;

    it("should return a single loan application by its ID", async () => {
      const mockedGetLoanById = jest.spyOn(loanService, "getLoanById");
      mockedGetLoanById.mockResolvedValue(application);

      const { status, body } = await request(app).get(url);

      expect(mockedGetLoanById).toHaveBeenCalledWith(id);
      expect(status).toBe(StatusCodes.OK);
      expect(body).toEqual(application);
    });

    it("should return NOT_FOUND status when loan application not exist", async () => {
      const mockedGetLoanById = jest.spyOn(loanService, "getLoanById");
      mockedGetLoanById.mockResolvedValue(undefined);

      const { status } = await request(app).get(url);

      expect(status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe("POST /loans", () => {
    it("should return id and monthlyPayment when request is valid", async () => {
      const expectedResponse = { id: uuidv4(), monthlyPayment: 1200 };
      const mockedSubmitLoan = jest.spyOn(loanService, "submitLoan");
      mockedSubmitLoan.mockResolvedValue(expectedResponse);

      const { status, body } = await request(app)
        .post("/loans")
        .send(applicationRequest);

      expect(status).toBe(StatusCodes.CREATED);
      expect(body).toEqual(expectedResponse);
    });

    it("should return error when required fields missing", async () => {
      const { status, body } = await request(app).post("/loans").send({});

      expect(status).toBe(StatusCodes.BAD_REQUEST);
      expect(body.error).toEqual("Invalid data");
      expect(body.details).toEqual(
        arrayContaining([
          objectContaining({ path: ["applicantName"], message: "Required" }),
          objectContaining({ path: ["loanType"], message: "Required" }),
          objectContaining({ path: ["loanAmount"], message: "Required" }),
          objectContaining({ path: ["interestRate"], message: "Required" }),
        ]),
      );
    });

    it("should return error when loanAmount less or equal than zero", async () => {
      const { status, body } = await request(app)
        .post("/loans")
        .send({ ...applicationRequest, loanAmount: 0 });

      expect(status).toBe(StatusCodes.BAD_REQUEST);
      expect(body.details).toEqual(
        arrayContaining([
          objectContaining({
            path: ["loanAmount"],
            message: "Number must be greater than 0",
          }),
        ]),
      );
    });

    it("should return error when loanAmount greater than 500k", async () => {
      const { status, body } = await request(app)
        .post("/loans")
        .send({ ...applicationRequest, loanAmount: 500_001 });

      expect(status).toBe(StatusCodes.BAD_REQUEST);
      expect(body.details).toEqual(
        arrayContaining([
          objectContaining({
            path: ["loanAmount"],
            message: "Number must be less than 500000",
          }),
        ]),
      );
    });
  });

  describe("PUT /loans/:id", () => {
    const id = uuidv4();
    const url = `/loans/${id}`;

    it("should return id and monthlyPayment when request is valid", async () => {
      const expectedResponse = { id: uuidv4(), monthlyPayment: 2300 };
      const mockedUpdateLoan = jest.spyOn(loanService, "updateLoan");
      mockedUpdateLoan.mockResolvedValue(expectedResponse);

      const { status, body } = await request(app)
        .put(url)
        .send(applicationRequest);

      expect(mockedUpdateLoan).toHaveBeenCalledWith(id, applicationRequest);
      expect(status).toBe(StatusCodes.OK);
      expect(body).toEqual(expectedResponse);
    });

    it("should return error when required fields missing", async () => {
      const { status, body } = await request(app).put(url).send({});

      expect(status).toBe(StatusCodes.BAD_REQUEST);
      expect(body.error).toEqual("Invalid data");
      expect(body.details).toEqual(
        arrayContaining([
          objectContaining({ path: ["applicantName"], message: "Required" }),
          objectContaining({ path: ["loanType"], message: "Required" }),
          objectContaining({ path: ["loanAmount"], message: "Required" }),
          objectContaining({ path: ["interestRate"], message: "Required" }),
        ]),
      );
    });

    it("should return error when loanAmount less or equal than zero", async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ ...applicationRequest, loanAmount: 0 });

      expect(status).toBe(StatusCodes.BAD_REQUEST);
      expect(body.details).toEqual(
        arrayContaining([
          objectContaining({
            path: ["loanAmount"],
            message: "Number must be greater than 0",
          }),
        ]),
      );
    });

    it("should return error when loanAmount greater than 500k", async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ ...applicationRequest, loanAmount: 500_001 });

      expect(status).toBe(StatusCodes.BAD_REQUEST);
      expect(body.details).toEqual(
        arrayContaining([
          objectContaining({
            path: ["loanAmount"],
            message: "Number must be less than 500000",
          }),
        ]),
      );
    });

    it("should return NOT_FOUND status when loan application not exist", async () => {
      const mockedUpdateLoan = jest.spyOn(loanService, "updateLoan");
      mockedUpdateLoan.mockResolvedValue(undefined);

      const { status } = await request(app).put(url).send(applicationRequest);

      expect(status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe("DELETE /loans/:id", () => {
    const id = uuidv4();
    const url = `/loans/${id}`;

    it("should delete a loan application by its ID", async () => {
      const mockedGetLoanById = jest.spyOn(loanService, "deleteLoan");
      mockedGetLoanById.mockResolvedValue(true);

      const { status } = await request(app).del(url);

      expect(mockedGetLoanById).toHaveBeenCalledWith(id);
      expect(status).toBe(StatusCodes.NO_CONTENT);
    });

    it("should return NOT_FOUND status when loan application not exist", async () => {
      const mockedGetLoanById = jest.spyOn(loanService, "deleteLoan");
      mockedGetLoanById.mockResolvedValue(false);

      const { status } = await request(app).del(url);

      expect(status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});

export const application: LoanApplication = {
  id: uuidv4(),
  applicantName: "A",
  loanType: LoanType.Car,
  loanAmount: 20000,
  income: 500000,
  interestRate: 7.5,
};
