import { Request, Response } from "express";
import { getJobState } from "../scheduled";

export const getJobsState = (req: Request, res: Response) => {
  res.send(getJobState());
};
