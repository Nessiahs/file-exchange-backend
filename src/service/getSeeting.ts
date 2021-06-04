import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { allowedSettingType, getSettingByType } from "../db/getSettingByType";

export const getSetting = async (req: Request, res: Response) => {
  const { type } = req.params;
  if (!allowedSettingType.includes(type)) {
    return res.status(STATUS_CODES.MethodNotAllowed);
  }

  try {
    res.send(await getSettingByType(type));
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }
};
