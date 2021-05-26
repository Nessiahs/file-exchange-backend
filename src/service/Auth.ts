import crypto from "crypto";
import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { db } from "../db/db";
import { createToken } from "../helper/createToken";

export const Auth = async (req: Request, res: Response) => {
  const { user, password } = req.body;
  if (!user || !password) {
    res.status(STATUS_CODES.Bad_Request).send();
    return;
  }

  db.get(
    "SELECT id, password, salt FROM user where email=$user",
    {
      $user: user,
    },
    (err: any, result: any) => {
      if (err) {
        res.status(STATUS_CODES.Server_Error).send();
        return;
      }

      if (!result) {
        res.status(STATUS_CODES.Unauthorized).send();
        return;
      }

      const hash = crypto.createHmac("sha512", result.salt);
      hash.update(password);
      if (hash.digest("hex") === result.password) {
        createToken(
          {
            id: result.id,
            type: "admin",
          },
          res
        );

        res.send({ success: true });
      } else {
        res.status(STATUS_CODES.Unauthorized).send();
      }
    }
  );
};
