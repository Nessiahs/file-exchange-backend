import { Request, Response } from "express";
import { generate } from "generate-password";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { STATUS_CODES } from "../config/statusCodes";
import { insertJob } from "../db/insertJob";
type TBodyData = {
  jobType: "download" | "upload";
  jobName: string;
  expires: string;
  privateJob: number;
};

export const createJob = async (req: Request, res: Response) => {
  const token = uuidv4();

  const { jobType, jobName, expires, privateJob } = req.body as TBodyData;
  const { id: createdBy } = req.body.tokenData;
  const secret = generate({
    length: 8,
    numbers: true,
  });

  const expireDate = moment().add(expires, "h");

  const link = `${process.env.FRONTEND_URI ?? `https://${req.headers.host}/`}${
    process.env.FRONTEND_UPLOAD_PATH ?? "upload/"
  }${token}/`;

  try {
    await insertJob({
      jobType,
      jobName,
      secret,
      expires: expireDate.format("YYYY-MM-DD HH:mm:ss"),
      token,
      createdBy,
      privateJob,
    });
    res.send({ link, token, secret });
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send(error);
  }
};
