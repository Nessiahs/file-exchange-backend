import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { passwordAlgorithm } from "../config/constants";
import { db } from "./db";
export const createUser = (
  email: string,
  password: string
): Promise<boolean> => {
  const salt = uuidv4();
  const hash = crypto.createHmac(passwordAlgorithm, salt);
  hash.update(password);
  const dbPass = hash.digest("hex");

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT into user (email, password, salt) VALUES ($email, $password, $salt)",
      {
        $email: email,
        $password: dbPass,
        $salt: salt,
      },
      (err) => {
        if (err) {
          return reject();
        }
        return resolve(true);
      }
    );
  });
};
