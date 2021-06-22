import { Request, Response } from "express";
import { rmdir } from "fs/promises";
import path from "path";
import { filePath } from "../config/constants";
import { STATUS_CODES } from "../config/statusCodes";
import { deleteFilesByToken } from "../db/deleteFilesByToken";
import { deleteJobByToken } from "../db/deleteJobByToken";
import { checkOwner } from "../utils/checkOwner";
export const deleteJob = async (req: Request, res: Response) => {
  const { isAdmin, id } = req.body.tokenData;
  const { token } = req.params;
  if (isAdmin === 0 && (await checkOwner(token, id)) === false) {
    return res.status(STATUS_CODES.Forbidden).send();
  }

  const deletePath = path.join(filePath, token);
  try {
    await rmdir(deletePath, { recursive: true });
    await deleteJobByToken(token);
    await deleteFilesByToken(token);
    res.send();
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }
};
