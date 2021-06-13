import { Request, Response } from "express";
import { getDiskInfo } from "../worker/diskspace";

export const hddStats = (req: Request, res: Response) => {
  res.send(getDiskInfo());
};
