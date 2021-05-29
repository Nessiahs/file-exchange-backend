import { db } from "./db";

export const deleteUserById = ($id: number) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM user WHERE id = $id", { $id }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};
