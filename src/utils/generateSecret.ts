import crypto from "crypto";
import { db } from "../db/db";

export const generateCrypto = async () => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO settings (type , settings) VALUES ("crypto", $settings)',
      {
        $settings: JSON.stringify(crypto.randomBytes(32)),
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
