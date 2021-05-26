import { db } from "./db";
import { TCustomerUpload } from "./types";

export const usersCustomerUploads = (
  id: number
): Promise<TCustomerUpload[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      "Select u.description,u.token, (SELECT count(f.id) FROM files f WHERE token=u.token) as 'fileCount' FROM uploads u WHERE fromUser=$id",
      {
        $id: id,
      },
      (err, result: TCustomerUpload[]) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      }
    );
  });
};
