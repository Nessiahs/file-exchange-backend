import { db } from "./db";

export const emailUsed = (email: string) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id FROM user WHERE email=$email",
      { $email: email },
      (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(!result);
      }
    );
  });
};
