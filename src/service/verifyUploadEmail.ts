import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { db } from "../db/db";
import { createToken } from "../helper/createToken";
export const verifyUploadEmail = (req: Request, res: Response) => {
  const { id, type } = req.body.tokenData;
  const { email } = req.body;

  if (!email || type !== "upload") {
    res.status(STATUS_CODES.Bad_Request).send();
    return;
  }

  db.get(
    "SELECT email FROM uploads WHERE id=$id",
    {
      $id: id,
    },
    (err, result) => {
      console.log(result.email, result.email.includes(email));
      if (err || !result || !result.email.includes(email)) {
        res.status(STATUS_CODES.Forbidden).send();
        return;
      }

      createToken(
        {
          id,
          type,
          verified: true,
        },
        res
      );

      res.send();
    }
  );
};
