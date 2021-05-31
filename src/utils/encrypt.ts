import crypto from "crypto";
import { cryptAlgorithm } from "../config/constants";
import { getCryptoKey } from "../db/getCryptoKey";

let key: Buffer;

export const encrypt = async (toEncript: Buffer | string) => {
  if (typeof toEncript === "string") {
    toEncript = Buffer.from(toEncript);
  }

  if (!key) {
    const k = JSON.parse(await getCryptoKey());
    key = Buffer.from(k.data);
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(cryptAlgorithm, key, iv);
  let encrypted = cipher.update(toEncript);
  encrypted = Buffer.concat([iv, encrypted, cipher.final()]);

  return encrypted;
};
