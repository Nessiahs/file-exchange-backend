import { lstat, readdir } from "fs/promises";
import getFolderSize from "get-folder-size";
import path from "path";
import { filePath, jobTimer } from "../config/constants";
type TJobSpace = {
  all: number;
  byJob: Record<string, number>;
};

const maxError = 5;
let errorCount = 0;
let allTimer: NodeJS.Timeout;
let folderTimer: NodeJS.Timeout;
let jobSpace: TJobSpace = {
  all: 0,
  byJob: {},
};

const handleError = () => {
  if (errorCount === maxError) {
    clearInterval(allTimer);
    clearInterval(folderTimer);
    jobSpace = { all: 0, byJob: {} };
    return;
  }
  ++errorCount;
};

const getSize = (path: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    getFolderSize(path, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

const gatherJobFolder = async () => {
  try {
    jobSpace.all = await getSize(filePath);
  } catch (error) {
    handleError();
  }
};

const gatherJobFolders = async () => {
  try {
    const list = await readdir(filePath);
    const result: Record<string, number> = {};

    for (const file of list) {
      const p = path.join(filePath, file);
      const f = await lstat(p);

      if (f.isDirectory()) {
        result[file] = await getSize(p);
      }
    }

    jobSpace.byJob = { ...result };
  } catch (error) {
    handleError();
  }
};

gatherJobFolder();
gatherJobFolders();

setInterval(gatherJobFolders, jobTimer);
setInterval(gatherJobFolder, jobTimer);

export const getJobSpace = () => {
  return jobSpace;
};
