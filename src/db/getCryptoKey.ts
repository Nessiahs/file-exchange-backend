import { db } from "./db";

export const getCryptoKey = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT settings FROM settings WHERE type='crypto'",
      (err, result) => {
        if (err || !result) {
          return reject(err);
        }

        resolve(result.settings);
      }
    );
  });
};
