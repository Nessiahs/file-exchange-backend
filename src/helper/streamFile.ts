import { Response } from "express";
import path from "path";
import { STATUS_CODES } from "../config/statusCodes";
import { filenameByTokenHashname } from "../db/filenameByTokenHashname";
import { incrementDownload } from "../db/incrementDownload";

const basePath = path.join(__dirname, "../../files");
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

    return res.download(path.join(basePath, folder, file), filename);
  } catch (error) {
    return res.status(STATUS_CODES.Not_Found).send();
  }
};
