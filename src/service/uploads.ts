import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { allUploads } from "../db/allUploads";
export const uploads = async (req: Request, res: Response) => {
  try {
    const response = await allUploads();
    res.send(response);
  } catch (error) {
    res.status(STATUS_CODES.ServerError).send(error);
  }
};
