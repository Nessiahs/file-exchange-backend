import { rmdir } from "fs/promises";
import path from "path";
import { filePath } from "../config/constants";
import { db } from "../db/db";
import { deleteFilesByToken } from "../db/deleteFilesByToken";
const liveTime = 7;
type TResult = {
  token: string;
};
const getJobs = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      `Select token FROM jobs where created <  (SELECT DATETIME('now', '-${liveTime} day'))`,
      (err, results: TResult[]) => {
        if (err) {
          return reject(err);
        }

        resolve(results.map((item) => item.token));
      }
    );
  });
};

const deleteJobs = (affectedRows: number): Promise<true> => {
  return new Promise((resolve, reject) => {
    db.run("BEGIN EXCLUSIVE TRANSACTION;");
    db.run(
      `DELETE FROM jobs WHERE created < (SELECT DATETIME('now', '-${liveTime} day'))`,
      function (err: any) {
        if (err) {
          return reject(err);
        }

        if (this.changes !== affectedRows) {
          db.run("ROLLBACK TRANSACTION");
          return reject("affected error");
        }
        db.run("COMMIT TRANSACTION");
        resolve(true);
      }
    );
  });
};

export const deleteExpiredJobs = async () => {
  try {
    const expired = await getJobs();
    await deleteJobs(expired.length);

    for (const token of expired) {
      deleteFilesByToken(token);
      const deletePath = path.join(filePath, token);
      await rmdir(deletePath, { recursive: true });
    }
  } catch (error) {
    return;
  }
};
