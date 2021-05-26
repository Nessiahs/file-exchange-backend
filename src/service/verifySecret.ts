import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { jobByToken } from "../db/jobByToken";
import { isJobType } from "../guards/isJwtType";
import { createToken } from "../helper/createToken";
export const verifySecret = async (req: Request, res: Response) => {
  const { secret } = req.body;
  const { "x-job-type": jobType, "x-job-token": token } = req.headers;
  console.log(secret, jobType, token);
  if (
    !secret ||
    !jobType ||
    !token ||
    typeof secret !== "string" ||
    typeof token !== "string" ||
    typeof jobType !== "string" ||
    !isJobType(jobType)
  ) {
    return res.status(STATUS_CODES.Bad_Request).send();
  }

  try {
    const data = await jobByToken(token);
    if (data.jobType !== jobType) {
      return res.status(STATUS_CODES.Bad_Request).send();
    }
    if (data.secret !== secret) {
      return res.status(STATUS_CODES.Forbidden).send();
    }
    createToken({ type: jobType, token, verified: true }, res);
    return res.send();
  } catch (error) {
    return res.status(STATUS_CODES.Forbidden).send();
  }
};
