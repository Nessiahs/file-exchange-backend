import { Request, Response } from "express";

export const isLogedIn = (req: Request, res: Response) => {
  const { isAdmin, id } = req.body.tokenData;
  res.send({ isAdmin, id });
};
