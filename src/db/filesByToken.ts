import { db } from "./db";
import { TFiles } from "./types";

export const filesByToken = (token: string): Promise<TFiles[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM files WHERE token=$token",
      {
        $token: token,
      },
      (err, files: TFiles[]) => {
        if (err) {
          return reject();
        }

        return resolve(files);
      }
    );
  });
};
