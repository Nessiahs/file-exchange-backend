import { NextFunction, Request, Response } from "express";
import { access } from "fs/promises";
import { configPath } from "../config/filePath";
import { STATUS_CODES } from "../config/statusCodes";

export const checkInstall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await access(configPath);
    res.status(STATUS_CODES.Forbidden).send();
  } catch (error) {
    next();
  }
};
