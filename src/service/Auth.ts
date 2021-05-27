import crypto from "crypto";
import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { userByEmail } from "../db/userByEmail";
import { createToken } from "../helper/createToken";

export const Auth = async (req: Request, res: Response) => {
  const { user, password } = req.body;
  if (!user || !password) {
    res.status(STATUS_CODES.Bad_Request).send();
    return;
  }

  try {
    const { salt, password, id } = await userByEmail(user);
    const hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    if (hash.digest("hex") === password) {
      createToken(
        {
          id,
          type: "admin",
        },
        res
      );

      res.send({ success: true });
    } else {
      res.status(STATUS_CODES.Unauthorized).send();
    }
  } catch (error) {
    if (error === "notFound") {
      return res.status(STATUS_CODES.Forbidden).send();
    }
    res.status(STATUS_CODES.Server_Error).send();
  }
};
