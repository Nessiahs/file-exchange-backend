import { db } from "./db";

export const incrementDownload = (hashname: string) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE files SET downloads = downloads + 1 WHERE hashname = $hashname",
      {
        $hashname: hashname,
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
