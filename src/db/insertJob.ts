import { db } from "./db";
import { TJob } from "./types";

export const insertJob = (data: TJob): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO jobs
      (jobType, jobName, secret, expires, created, token, createdBy) VALUES
      (?,?,?,?,datetime('now'),?,?)`,
      [
        data.jobType,
        data.jobName,
        data.secret,
        data.expires,
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
