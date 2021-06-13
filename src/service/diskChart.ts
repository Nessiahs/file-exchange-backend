import { Request, Response } from "express";
import { getJobSpace } from "../worker/jobSpace";

export const diskCharts = async (req: Request, res: Response) => {
  res.send(Object.values(getJobSpace()));
};
