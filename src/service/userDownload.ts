import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { streamFile } from "../helper/streamFile";

export const userDownload = (req: Request, res: Response) => {
  const { hashname } = req.params;
  const { token } = req.body.tokenData;

  if (
    !hashname ||
    typeof hashname !== "string" ||
    !token ||
    typeof token !== "string"
  ) {
    res.status(STATUS_CODES.Bad_Request).send();
  }

  streamFile(token, hashname, res, true);
};
