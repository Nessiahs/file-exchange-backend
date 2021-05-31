import crypto from "crypto";
import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { userByEmail } from "../db/userByEmail";
import { createToken } from "../utils/createToken";

export const auth = async (req: Request, res: Response) => {
  const { user, password } = req.body;
  if (
    !user ||
    !password ||
    typeof user !== "string" ||
    typeof password !== "string"
  ) {
    res.status(STATUS_CODES.BadRequest).send();
    return;
  }

  try {
    const {
      salt,
      password: dbPass,
      id,
      isAdmin,
      lastLogin,
    } = await userByEmail(user);
    const hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    if (hash.digest("hex") === dbPass) {
      createToken(
        {
          id,
          type: "admin",
          isAdmin,
        },
        res
      );

      res.send({ isAdmin, lastLogin });
    } else {
      res.status(STATUS_CODES.Unauthorized).send();
    }
  } catch (error) {
    if (error === "notFound") {
      return res.status(STATUS_CODES.Forbidden).send();
    }
    res.status(STATUS_CODES.ServerError).send();
  }
};
