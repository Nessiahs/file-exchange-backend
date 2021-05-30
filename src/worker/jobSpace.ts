import checkDiskSpace from "check-disk-space";
import { lstat, readdir } from "fs/promises";
import path from "path";
import { filePath } from "../config/constants";
type TJobSpace = {
  all: {
    free: number;
    size: number;
  };
  byJob: Record<string, number>;
};

const maxError = 5;
let errorCount = 0;
let jobTimer: NodeJS.Timeout;
let folderTimer: NodeJS.Timeout;
let jobSpace: TJobSpace = {
  all: {
    free: 0,
    size: 0,
  },
  byJob: {},
};

const handleError = () => {
  if (errorCount === maxError) {
    clearInterval(jobTimer);
    clearInterval(folderTimer);
    jobSpace = { all: { free: 0, size: 0 }, byJob: {} };
    return;
  }
  ++errorCount;
};

const gatherJobFolder = async () => {
  try {
    const { free, size } = await checkDiskSpace(filePath);
    jobSpace.all = { free, size };
  } catch (error) {
    handleError();
  }
};

const gatherJobFolders = async () => {
  try {
    const list = await readdir(filePath);
    const result: Record<string, number> = {};

    for (const file of list) {
      const f = await lstat(path.join(filePath, file));

      if (f.isDirectory()) {
        result[file] = f.size;
      }
    }

    jobSpace.byJob = { ...result };
  } catch (error) {
    handleError();
  }
};

gatherJobFolder();
gatherJobFolders();
export const getJobSpace = () => {
  return jobSpace;
};
