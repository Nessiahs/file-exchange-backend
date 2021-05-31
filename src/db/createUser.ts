import crypto from "crypto";
import moment from "moment";
import { passwordAlgorithm } from "../config/constants";
import { generateSalt } from "../utils/generateSalt";
import { db } from "./db";

export const createUser = async (
  email: string,
  password: string,
  isAdmin: 0 | 1
): Promise<boolean> => {
  const salt = await generateSalt();
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
