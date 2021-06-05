import { db } from "./db";

export const allowedSettingType = ["ipRestrictions"];

export const getSettingByType = (
  $type: string
): Promise<{ settings: string | null }> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT settings FROM settings WHERE type=$type",
      { $type },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result ?? { settings: null });
      }
    );
  });
};
