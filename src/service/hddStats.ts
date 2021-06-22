import { Request, Response } from "express";
import { getDiskInfo } from "../scheduled/diskSpace";

export const hddStats = (req: Request, res: Response) => {
  res.send(getDiskInfo());
};
