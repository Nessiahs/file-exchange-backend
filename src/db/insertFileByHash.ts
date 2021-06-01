import { db } from "./db";

export const insertFileByHash = (
  hash: string,
  filename: string,
  hashname: string,
  size?: number
) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO files (token, filename, hashname, created, size) VALUES (?, ?, ?, datetime('now'),?)",
      [hash, filename, hashname, size],
      (err) => {
        if (err) {
          return reject();
        }

        resolve(true);
      }
    );
  });
};
