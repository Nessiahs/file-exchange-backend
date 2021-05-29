import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { filesByToken } from "../db/filesByToken";
import { jobByToken } from "../db/jobByToken";

export const userFileList = async (req: Request, res: Response) => {
  const { token, verified, type } = req.body.tokenData;

  try {
    const { secret, jobType } = await jobByToken(token);

    if ((secret && !verified) || type !== jobType) {
      return res.status(STATUS_CODES.Forbidden);
    }
    res.send(await filesByToken(token));
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }
};
