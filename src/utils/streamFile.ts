import { Response } from "express";
import { readFile } from "fs/promises";
import path from "path";
import { filePath } from "../config/constants";
import { STATUS_CODES } from "../config/statusCodes";
import { filenameByTokenHashname } from "../db/filenameByTokenHashname";
import { incrementDownload } from "../db/incrementDownload";
import { decrypt } from "./decrypd";

export const streamFile = async (
  folder: string,
  file: string,
  res: Response,
  increment = false
) => {
  try {
    const { filename } = await filenameByTokenHashname(folder, file);
    res.setHeader("x-filename", filename);
    if (increment) {
      await incrementDownload(file);
    }

    const encrypted = await readFile(
      path.join(filePath, folder, `${file}.enc`)
    );

    const plain = await decrypt(encrypted);

    return res.send(plain);
  } catch (error) {
    return res.status(STATUS_CODES.NotFound).send();
  }
};
