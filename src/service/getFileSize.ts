import { lstat } from "fs/promises";
import path from "path";
import { TFiles } from "../db/types";
const basePath = path.join(__dirname, "../../files");

export const getFileSize = async (fileInfo: TFiles) => {
  const sourcePath = path.join(basePath, fileInfo.token);
  try {
    const f = await lstat(path.join(sourcePath, fileInfo.hashname));
    fileInfo.size = f.size;
    return fileInfo;
  } catch (error) {}
};
