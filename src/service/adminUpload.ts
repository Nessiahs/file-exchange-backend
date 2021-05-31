import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { receiveFile } from "../utils/receiveFile";

export const adminUpload = async (req: Request, res: Response) => {
  const { token } = req.params;

  if (!token || typeof token !== "string") {
    return res.status(STATUS_CODES.BadRequest).send();
  }

  receiveFile(req, res, token);
};
