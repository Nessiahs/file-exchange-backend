import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { createUser } from "../db/createUser";

export const addUser = async (req: Request, res: Response) => {
  let { isAdmin } = req.body;
  const { email, password } = req.body;
  isAdmin = Number(isAdmin);

  if (!email || (!password && (isAdmin !== 0 || isAdmin !== 1))) {
    return res.status(STATUS_CODES.BadRequest).send();
  }

  try {
    res.send(await createUser(email, password, isAdmin));
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }
};
