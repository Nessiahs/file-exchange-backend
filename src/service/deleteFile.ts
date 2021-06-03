import { Request, Response } from "express";
import { rm } from "fs/promises";
import path from "path";
import { filePath } from "../config/constants";
import { STATUS_CODES } from "../config/statusCodes";
import { deleteFileById } from "../db/deleteFileById";
import { fileById } from "../db/fileById";
import { checkOwner } from "../utils/checkOwner";
filePath;
export const deleteFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isAdmin, id: userId } = req.body.tokenData;
  if (!id || isNaN(Number(id))) {
    return res.status(STATUS_CODES.BadRequest).send();
  }

  try {
    const { token, hashname } = await fileById(Number(id));

    if (isAdmin === 0 && (await checkOwner(token, userId)) === false) {
      return res.status(STATUS_CODES.Forbidden).send();
    }
    const deletePath = path.join(filePath, token, `${hashname}.enc`);
    await rm(deletePath);
    await deleteFileById(Number(id));
    return res.send();
  } catch (error) {
    return res.status(STATUS_CODES.ServerError).send();
  }
};
