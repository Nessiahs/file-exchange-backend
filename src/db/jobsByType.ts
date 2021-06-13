import { db } from "./db";
import { TJobType } from "./types";

export const jobsByType = ($jobType: TJobType, $user: number) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT
        j.token, j.jobName, j.jobType, j.secret, expires, j.created,
        (SELECT COUNT(f.id) FROM files f WHERE f.token=j.token) as files
        FROM jobs j WHERE (jobType=$jobType AND privateJob=0) OR (jobType=$jobType AND createdBy == $user AND privateJob=1)`,
      {
        $jobType,
        $user,
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};
