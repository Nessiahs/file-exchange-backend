import { db } from "./db";
import { TUser } from "./types";

export const userByEmail = (email: string): Promise<TUser> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM user WHERE email=$email",
      {
        $email: email,
      },
      (err, result) => {
        if (err) {
          return reject(err);
        } else if (!result) {
          return reject("notFound");
        }

        resolve(result);
      }
    );
  });
};
