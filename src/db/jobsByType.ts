import { db } from "./db";
import { TJobType } from "./types";

export const jobsByType = (job: TJobType) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT
        j.token, j.jobName, j.jobType, j.secret, expires, j.created,
        (SELECT COUNT(f.id) FROM files f WHERE f.token=j.token) as files
        FROM jobs j WHERE jobType=?`,
      [job],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};
