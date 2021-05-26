import { db } from "./db";
import { TUpload } from "./types";

export const getUploadById = (id: number): Promise<TUpload> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM uploads WHERE id=$id",
      {
        $id: id,
      },
      (err, result: TUpload) => {
        if (err || !result) {
          reject(err);
          return;
        }

        resolve(result);
      }
    );
  });
};
