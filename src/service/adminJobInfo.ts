import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { filesByToken } from "../db/filesByToken";
import { jobByToken } from "../db/jobByToken";
import { TJobType } from "../db/types";
import { allowdTypes } from "./jobsByType";

export const adminJobInfo = async (req: Request, res: Response) => {
  const { token, jobType } = req.params;

  if (!token) {
    return res.status(STATUS_CODES.Bad_Request);
  }
  if (!jobType || !allowdTypes.includes(jobType as TJobType)) {
    return res.status(STATUS_CODES.Bad_Request).send();
  }
  const jobInfo = jobByToken(token);
  const jobFiles = filesByToken(token);

  Promise.all([jobInfo, jobFiles])
    .then((values) => {
      res.send({
        info: values[0],
        files: values[1],
      });
    })
    .catch(() => {
      res.status(STATUS_CODES.Server_Error).send();
    });
};
