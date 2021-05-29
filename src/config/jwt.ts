import * as dotenv from "dotenv";
import jwt, { Algorithm } from "jsonwebtoken";
import path from "path";
import { getRandomString } from "../helper/getRandomString";

const getNodeEnv = () => {
  if (!process.env.NODE_ENV) {
    return "";
  }

  return `.${process.env.NODE_ENV}`;
};

dotenv.config({
  path: path.join(__dirname, `../../.env${getNodeEnv()}`),
});
const jwtAlgorithms = [
  "HS256",
  "HS384",
  "HS512",
  "RS256",
  "RS384",
  "RS512",
  "ES256",
  "ES384",
  "ES512",
  "PS256",
  "PS384",
  "PS512",
  "none",
];

const isJwtAlgorithm = (algorithm: string): algorithm is Algorithm => {
  return jwtAlgorithms.includes(algorithm);
};

export const JWT_KEY = process.env.JWT_KEY
  ? process.env.JWT_KEY
  : getRandomString();

if (!isJwtAlgorithm(process.env.JWT_ALGORITH)) {
  throw new Error(`${process.env.JWT_ALGORITH} is not a valid algorithm`);
}

const expires =
  process.env.JWT_EXPIRE && typeof process.env.JWT_EXPIRE === "string"
    ? process.env.JWT_EXPIRE
    : "1h";

export const JWT_VERIFY_CONFIG: jwt.VerifyOptions = {
  algorithms: [process.env.JWT_ALGORITH],
  ignoreExpiration: false,
};

export const JWT_SIGN_CONFIG: jwt.SignOptions = {
  algorithm: process.env.JWT_ALGORITH,
  expiresIn: expires,
};
