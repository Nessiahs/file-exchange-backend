import { Request, Response } from "express";

export const isLogedIn = (req: Request, res: Response) => {
  res.send("ok");
};
