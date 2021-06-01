import { db } from "./db";

export const updateUserLogindate = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE user SET lastLogin=datetime('now') WHERE id=$id",
      {
        $id: id,
      },
      (err) => {
        if (err) {
          return reject(err);
        }

        resolve(true);
      }
    );
  });
};
