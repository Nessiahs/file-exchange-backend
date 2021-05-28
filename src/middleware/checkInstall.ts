import { NextFunction, Request, Response } from "express";
import { access } from "fs/promises";
import { isInstalled } from "../config/filePath";
import { STATUS_CODES } from "../config/statusCodes";

const allowedPathes = ["/install/create/"];

export const checkInstall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await access(isInstalled);
    next();
  } catch (error) {
    if (allowedPathes.includes(req.path)) {
      return next();
    }
    res.status(STATUS_CODES.Forbidden).send({ installed: false });
  }
};
