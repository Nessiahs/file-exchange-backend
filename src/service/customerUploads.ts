import { Request, Response } from "express";
import { usersCustomerUploads } from "../db/usersCustomerUploads";

export const customerUploads = async (req: Request, res: Response) => {
  const uploads = await usersCustomerUploads(req.body.tokenData.id);

  res.send(uploads);
};
