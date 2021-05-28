import crypto from "crypto";

export const getRandomString = () => {
  const length = 50;
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};
