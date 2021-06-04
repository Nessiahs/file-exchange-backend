import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { allowedSettingType } from "../db/getSettingByType";
import { saveSettingByType } from "../db/saveSettingByType";

export const saveSetting = async (req: Request, res: Response) => {
  const { type } = req.params;
  const { data } = req.body;
  if (!allowedSettingType.includes(type)) {
    return res.status(STATUS_CODES.MethodNotAllowed);
  }

  try {
    await saveSettingByType(type, data);
    res.send();
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send();
  }
};
