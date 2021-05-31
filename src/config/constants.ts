import path from "path";

export const filePath = path.join(__dirname, "../../files");

export const tmpPath = path.join(__dirname, "../../tmp");

export const isInstalled = path.join(__dirname, "../../install");

export const passwordAlgorithm = "sha512";

export const jobTimer = 1000 * 60 * 5; // 5 Minutes

export const cryptAlgorithm = "aes-256-cbc";
