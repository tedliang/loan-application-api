import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export const validateData =
  <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = schema.safeParse(req.body);
    if (success) {
      next();
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid data", details: error.errors });
    }
  };
