import { Request, Response } from "express";
import moment from "moment";
import { STATUS_CODES } from "../config/statusCodes";
import { jobByToken } from "../db/jobByToken";
import { isJobType } from "../guards/isJwtType";
import { createToken } from "../utils/createToken";
import { verifyToken } from "../utils/verifyToken";

export const verifyJob = async (req: Request, res: Response) => {
  const { "x-job-token": token, "x-job-type": jobType } = req.headers;
  const jwtToken = req.headers["x-jwt-token"];
  if (
    !token ||
    typeof token !== "string" ||
    !isJobType(jobType) ||
    typeof jwtToken !== "string"
  ) {
    return res.status(STATUS_CODES.BadRequest);
  }

  try {
    const { jobType, secret, expires } = await jobByToken(token);

    if (jobType !== jobType) {
      return res.status(STATUS_CODES.BadRequest).send();
    }

    if (expires && moment(expires) < moment()) {
      return res.status(STATUS_CODES.NotAcceptable).send();
    }

    if (secret) {
      if (jwtToken === "null") {
        return res.status(STATUS_CODES.Forbidden).send();
      }

      const { content } = await verifyToken(jwtToken, jobType);

      if (content.data.token !== token || !content.data.verified) {
        return res.status(STATUS_CODES.Forbidden).send();
      }
    }

    if (jwtToken === "null") {
      createToken(
        {
          type: jobType,
          verified: false,
          token,
        },
        res
      );
    } else {
      const { token: renewToken } = await verifyToken(jwtToken);
      res.set("x-jwt-token", renewToken);
    }
    res.send();
  } catch (error) {
    return res.status(STATUS_CODES.BadRequest).send();
  }
};
