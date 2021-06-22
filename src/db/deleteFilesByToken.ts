import { db } from "./db";

export const deleteFilesByToken = ($token: string) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM files WHERE token=$token", { $token }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};
