import { db } from "./db";

export const allowedSettingType = ["ipRestrictions"];

export const getSettingByType = ($type: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT settings FROM settings WHERE type=$type",
      { $type },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log(result);
        resolve(result ?? null);
      }
    );
  });
};
