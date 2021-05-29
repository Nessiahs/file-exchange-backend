import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { userList as list } from "../db/userList";

export const usersList = async (req: Request, res: Response) => {
  try {
    res.send(await list());
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }
};
