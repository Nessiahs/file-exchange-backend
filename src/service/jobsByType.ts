import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { jobsByType } from "../db/jobsByType";
import { TJobType } from "../db/types";

export const allowdTypes: TJobType[] = ["download", "upload"];

export const jobByType = async (req: Request, res: Response) => {
  const { jobType } = req.params;
  const { id } = req.body.tokenData;

  if (!jobType || !allowdTypes.includes(jobType as TJobType)) {
    return res.status(STATUS_CODES.BadRequest).send();
  }

  try {
    res.send(await jobsByType(jobType as TJobType, id));
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }
};
