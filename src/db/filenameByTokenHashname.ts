import { db } from "./db";

export const filenameByTokenHashname = (
  token: string,
  hashname: string
): Promise<{ filename: string }> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT filename FROM files WHERE token=$token AND hashname=$hashname",
      {
        $token: token,
        $hashname: hashname,
      },
      (err, result) => {
        if (err || !result) {
          return reject();
        }

        resolve(result);
      }
    );
  });
};
