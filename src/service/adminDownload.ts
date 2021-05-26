import { Request, Response } from "express";
import { streamFile } from "../helper/streamFile";

export const adminDownload = async (req: Request, res: Response) => {
  const { folder, file } = req.params;

  streamFile(folder, file, res);
};
