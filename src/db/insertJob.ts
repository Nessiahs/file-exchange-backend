import moment from "moment";
import { db } from "./db";
import { TJob } from "./types";

export const insertJob = (data: TJob): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO jobs
      (jobType, jobName, secret, expires, created, token, createdBy) VALUES
      (?,?,?,?,?,?,?)`,
      [
        data.jobType,
        data.jobName,
        data.secret,
        data.expires,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        data.token,
        data.createdBy,
      ],
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      }
    );
  });
};
