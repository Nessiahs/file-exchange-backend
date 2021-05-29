import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { emailUsed } from "../db/emailUsed";

export const verifyEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(STATUS_CODES.BadRequest);
  }

  try {
    res.send({ allowed: await emailUsed(email) });
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send(error);
  }
};
