import { Request, Response } from "express";

export const isLogedIn = (req: Request, res: Response) => {
  res.send({ isAdmin: req.body.tokenData.isAdmin });
};
