import { Request, Response } from "express";
import { rm } from "fs/promises";
import path from "path";
import { filePath } from "../config/constants";
import { STATUS_CODES } from "../config/statusCodes";
import { deleteFileById } from "../db/deleteFileById";
import { fileById } from "../db/fileById";
filePath;
export const deleteFile = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(STATUS_CODES.BadRequest).send();
  }

  try {
    const result = await fileById(Number(id));
    const deletePath = path.join(filePath, result.token, result.hashname);
    await rm(deletePath);
    await deleteFileById(Number(id));
    res.send();
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }

  res.send({ delete: id });
};
