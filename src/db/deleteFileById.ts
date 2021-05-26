import { db } from "./db";

export const deleteFileById = (id: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM files WHERE id=?", [id], (err) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};
