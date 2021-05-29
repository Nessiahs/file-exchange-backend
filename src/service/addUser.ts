import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { createUser } from "../db/createUser";
const rules = [0, 1];
export const addUser = async (req: Request, res: Response) => {
  let { email, password, isAdmin } = req.body;
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
