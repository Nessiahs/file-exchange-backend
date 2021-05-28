import { db } from "./db";
import { TUser } from "./types";

export const allUser = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM user ORDER BY email DESC", (err, result: TUser[]) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};
