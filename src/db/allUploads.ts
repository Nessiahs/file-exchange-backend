import { db } from "./db";

export const allUploads = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "Select u.description,u.token, (SELECT count(f.id) FROM files f WHERE token=u.token) as 'fileCount' FROM uploads u",
      (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      }
    );
  });
};
