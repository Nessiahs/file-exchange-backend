import { db } from "./db";
import { TJob } from "./types";

export const jobByToken = (token: string): Promise<TJob> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT j.token, j.job_name as jobName, j.job_type as jobType, j.secret, expires, j.created FROM jobs j WHERE token=$token",
      { $token: token },
      (err, job: TJob) => {
        if (err || !job) {
          return reject();
        }

        resolve(job);
      }
    );
  });
};