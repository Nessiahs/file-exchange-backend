import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { copyFile, mkdir, rm } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { filePath } from "../config/constants";
import { STATUS_CODES } from "../config/statusCodes";
import { insertFileByHash } from "../db/insertFileByHash";
export const receiveFile = async (
  req: Request,
  res: Response,
  token: string
) => {
  try {
    const uuid = uuidv4();
    const file = req.files.file as fileUpload.UploadedFile;
    await insertFileByHash(token, file.name, uuid, file.size);
    const target = path.join(filePath, token);
    await mkdir(target, {
      recursive: true,
    });

    await copyFile(file.tempFilePath, path.join(target, uuid));
    await rm(file.tempFilePath);
    res.send(uuid);
  } catch (error) {
    res.status(STATUS_CODES.Server_Error).send(error);
  }
};
