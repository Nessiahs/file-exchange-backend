import crypto from "crypto";

const byteLength = 128;
export const generateSalt = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength, (err, buf) => {
      if (err) {
        return reject(err);
      }

      resolve(buf.toString("hex"));
    });
  });
};
