import { Request, Response } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { db } from "../db/db";
import { TUpload } from "../db/types";
import { createToken } from "../utils/createToken";
import { verifyToken } from "../utils/verifyToken";

const tokenPathParams = {
  files: "verified",
  verify: "type",
};

type TTokenPathParams = typeof tokenPathParams;

const isTokenPathKey = (key: string): key is keyof TTokenPathParams => {
  return Object.keys(tokenPathParams).includes(key);
};

export const verifyUploadToken = async (req: Request, res: Response) => {
  const { hash, path } = req.params;
  const token = req.headers["x-jwt-token"];

  if (!hash || !path) {
    res.status(STATUS_CODES.BadRequest).send();
    return;
  }

  if (token !== "null" && typeof token === "string") {
    try {
      const { token: renewToken, content } = await verifyToken(token, "upload");

      if (!isTokenPathKey(path)) {
        res.status(STATUS_CODES.NotImplemented).send({ hash });
        return;
      }

      // Check if token has all params for this step
      const param = tokenPathParams[path];
      if (!Object.keys(content.data).includes(param)) {
        res.status(STATUS_CODES.BadRequest).send();
        return;
      }

      res.set("x-jwt-token", renewToken).send();
      return;
    } catch (error) {
      res.status(STATUS_CODES.Forbidden).send({ hash });
      return;
    }
  }

  db.get(
    "SELECT * FROM uploads WHERE token=$hash",
    {
      $hash: hash,
    },
    (err, result: TUpload) => {
      if (err) {
        res.status(STATUS_CODES.ServerError).send();
        return;
      }

      if (!result) {
        res.status(STATUS_CODES.BadRequest).send({ hash });
        return;
      }

      if (result.done === 1) {
        res.status(STATUS_CODES.MethodNotAllowed).send({ hash });
        return;
      }

      if (result.expired && new Date(result.expired).getTime() < Date.now()) {
        res.status(STATUS_CODES.MethodNotAllowed).send({ hash });
        return;
      }
      createToken({ id: result.id, type: "upload" }, res);

      res.send();
    }
  );
};
