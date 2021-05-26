import { db } from "./db";
import { TFiles } from "./types";

export const fileById = (id: number): Promise<TFiles> => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM files WHERE id=?", [id], (err, result) => {
      if (err || !result) {
        return reject();
      }

      resolve(result);
    });
  });
};
