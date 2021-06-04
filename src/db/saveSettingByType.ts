import { db } from "./db";
import { getSettingByType } from "./getSettingByType";

export const saveSettingByType = (
  $type: string,
  $value: string
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbData = await getSettingByType($type);
      const replace = { $type, $value };
      if (dbData === null) {
        db.run(
          "INSERT INTO settings (type, settings) VALUES ($type, $value)",
          replace,
          (err) => {
            if (err) {
              return reject(err);
            }
            resolve(true);
          }
        );
      } else {
        db.run(
          "UPDATE settings SET settings=$value WHERE type=$type",
          replace,
          (err) => {
            if (err) {
              reject(err);
            }
            resolve(true);
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};
