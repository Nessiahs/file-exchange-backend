import crypto from "crypto";
import { passwordAlgorithm } from "../config/constants";
import { db } from "../db/db";
import { generateSalt } from "./generateSalt";

const scrypt = (
  password: string,
  salt: string,
  keylen: number
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, keylen, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

export const generateCrypto = async () => {
  const salt = await generateSalt();
  const iv = crypto.createHmac(passwordAlgorithm, salt);
  iv.update(await generateSalt());

  const derivedKey = await scrypt(
    await generateSalt(),
    await generateSalt(),
    256
  );

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO settings (type , settings) VALUES ("crypto", $settings)',
      {
        $settings: JSON.stringify({
          iv: iv.digest("hex"),
          key: derivedKey.toString("hex"),
        }),
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
