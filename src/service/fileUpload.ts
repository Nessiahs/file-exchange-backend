import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { jobByToken } from "../db/jobByToken";
import { receiveFile } from "../helper/receiveFile";

export const uploadFile = async (req: Request, res: Response) => {
  const { token, verified } = req.body.tokenData;

  const { secret } = await jobByToken(token);

  if ((secret && !verified) || typeof token !== "string") {
    return res.status(STATUS_CODES.BadRequest);
  }
  receiveFile(req, res, token);
};
