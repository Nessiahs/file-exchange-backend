import { db } from "./db";

export const userList = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT id, email, created,isAdmin, lastLogin  FROM user",
      (err, results) => {
        if (err) {
          return reject;
        }
        resolve(results);
      }
    );
  });
};
