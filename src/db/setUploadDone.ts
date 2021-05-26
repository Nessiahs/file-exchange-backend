import { db } from "./db";

export const setUploadDone = (hash: string) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE uploads SET done=1 WHERE token=$hash",
      {
        $hash: hash,
      },
      (err) => {
        if (err) {
          return reject();
        }

        resolve(true);
      }
    );
  });
};
