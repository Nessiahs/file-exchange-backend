import { db } from "./db";

export const deleteJobByToken = ($token: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM jobs WHERE token=$token", { $token }, (err) => {
      if (err) {
        return reject();
      }
      resolve(true);
    });
  });
};
