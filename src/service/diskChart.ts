import { Request, Response } from "express";
import { getJobSpace } from "../scheduled/jobSpace";

export const diskCharts = async (req: Request, res: Response) => {
  res.send(Object.values(getJobSpace()));
};
