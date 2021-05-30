import { Request, Response } from "express";
import { getDiskInfo } from "../worker/diskspace";
import { getJobSpace } from "../worker/jobSpace";

export const hddStats = (req: Request, res: Response) => {
  res.send({
    disk: getDiskInfo(),
    jobs: getJobSpace(),
  });
};
