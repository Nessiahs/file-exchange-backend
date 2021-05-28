import crypto from "crypto";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { passwordAlgorithm } from "../config/constants";
import { db } from "./db";
export const createUser = (
  email: string,
  password: string,
  isAdmin: 0 | 1
): Promise<boolean> => {
  const salt = uuidv4();
  const hash = crypto.createHmac(passwordAlgorithm, salt);
  hash.update(password);
  const dbPass = hash.digest("hex");

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT into user (email, password, salt, isAdmin, created, lastLogin) VALUES ($email, $password, $salt, $isAdmin, $created, '')",
      {
        $email: email,
        $password: dbPass,
        $salt: salt,
        $isAdmin: isAdmin,
        $created: moment().format("YYYY-MM-DD HH:mm:ss"),
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
