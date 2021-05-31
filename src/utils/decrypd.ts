import crypto from "crypto";
import { cryptAlgorithm } from "../config/constants";
import { getCryptoKey } from "../db/getCryptoKey";

let key: Buffer;

export const decrypt = async (buffer: Buffer | string) => {
  let toDecrypt = buffer;
  if (typeof toDecrypt === "string") {
    toDecrypt = Buffer.from(toDecrypt);
  }

  if (!key) {
    const k = JSON.parse(await getCryptoKey());
    key = Buffer.from(k.data);
  }

  const iv = toDecrypt.slice(0, 16);
  const decipher = crypto.createDecipheriv(cryptAlgorithm, key, iv);
  let plain = decipher.update(toDecrypt.slice(16));
  plain = Buffer.concat([plain, decipher.final()]);
  return plain;
};
