import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { deleteUserById } from "../db/deleteUserById";

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = Number(id);
  if (typeof userId !== "number") {
    return res.status(STATUS_CODES.BadRequest).send();
  }

  try {
    await deleteUserById(userId);
    res.send();
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }
};
