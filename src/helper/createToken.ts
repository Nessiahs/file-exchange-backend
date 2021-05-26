import { Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY, JWT_SIGN_CONFIG } from "../config/jwt";
import { STATUS_CODES } from "../config/statusCodes";
import { JwtData } from "../middleware/jwt.type";

export const createToken = (tokenData: JwtData, res: Response) => {
  try {
    const token = jwt.sign({ data: tokenData }, JWT_KEY, JWT_SIGN_CONFIG);
    res.set("x-jwt-token", token);
    return;
  } catch (error) {
    res.status(STATUS_CODES.Server_Error);
  }
};
