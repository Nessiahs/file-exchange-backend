import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { setUploadDone } from "../db/setUploadDone";

export const uploadDone = async (req: Request, res: Response) => {
  const { hash } = req.body;

  if (!hash || typeof hash !== "string") {
    res.status(STATUS_CODES.Bad_Request).send();
    return;
  }

  await setUploadDone(hash);
  res.send();
};
