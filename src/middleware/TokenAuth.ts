import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { verifyToken } from "../utils/verifyToken";

export const TokenAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-jwt-token"];
  if (!token || typeof token !== "string") {
    res.status(STATUS_CODES.Forbidden).send("Forbidden");
    return;
  }

  try {
    const { token: renewToken, content } = await verifyToken(token);
    res.set("x-jwt-token", renewToken);
    req.body.tokenData = content.data;
    next();
  } catch (error) {
    res.status(STATUS_CODES.Unauthorized).send();
  }
};
