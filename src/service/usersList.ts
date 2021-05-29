import { Request, Response } from "express";

export const usersList = (req: Request, res: Response) => {
  res.send("works");
};
