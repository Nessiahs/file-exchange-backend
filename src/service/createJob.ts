import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { STATUS_CODES } from "../config/statusCodes";
import { insertJob } from "../db/insertJob";
type TBodyData = {
  jobType: "download" | "upload";
  jobName: string;
  password?: string;
  expires?: string;
};

export const createJob = async (req: Request, res: Response) => {
  const token = uuidv4();
  const { jobType, jobName, password, expires } = req.body as TBodyData;

  const link = `${process.env.FRONTEND_URI}${process.env.FRONTEND_UPLOAD_PATH}${token}/verify/`;

  try {
    await insertJob({
      jobType,
      jobName,
      secret: password,
      expires,
      token,
      created_by: req.body.tokenData.id,
    });
    res.send({ link, token });
  } catch (error) {
    res.status(STATUS_CODES.Server_Error).send(error);
  }
};