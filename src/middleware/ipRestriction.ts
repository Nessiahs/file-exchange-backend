import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { ipSettings } from "../utils/ipSetting";

export const ipRestriction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const settings = ipSettings.get();

  if (!settings.restricted) {
    return next();
  }

  if (settings.useProxy) {
    const headers = req.headers;
    for (const header of settings.proxyHeader) {
      const check = headers[header];
      if (
        check &&
        typeof check === "string" &&
        settings.allowedIp.includes(check)
      ) {
        return next();
      }
    }
  } else if (settings.allowedIp.includes(req.ip)) {
    return next();
  }

  res.send(STATUS_CODES.NotFound).send();
};
