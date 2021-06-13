import { lstat, readdir } from "fs/promises";
import getFolderSize from "get-folder-size";
import path from "path";
import { filePath, jobTimer } from "../config/constants";
import { db } from "../db/db";
type TJobSpace = {
  [key: string]: {
    size: number;
    color: string;
  };
};

const maxError = 5;
let errorCount = 0;

let timer: NodeJS.Timeout;
let jobSpace: TJobSpace = {};

const handleError = () => {
  if (errorCount === maxError) {
    clearInterval(timer);
    jobSpace = {};
    return;
  }
  ++errorCount;
};

type TResult = {
  token: string;
};

const getAllJobs = (): Promise<TResult[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT token FROM jobs", (err, result: TResult[]) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

const getChartColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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

const gatherJobFolders = async () => {
  const validToken = await getAllJobs();

  console.log(validToken);
  try {
    const list = await readdir(filePath);

    for (const file of list) {
      const p = path.join(filePath, file);
      const f = await lstat(p);

      if (!f.isDirectory() || !validToken.find((t) => t.token === file)) {
        continue;
      }

      if (!jobSpace.hasOwnProperty(file)) {
        jobSpace = {
          ...jobSpace,
          [file]: {
            size: await getSize(p),
            color: getChartColor(),
          },
        };
      } else {
        jobSpace = {
          ...jobSpace,
          [file]: {
            ...jobSpace[file],
            size: await getSize(p),
          },
        };
      }
    }
  } catch (error) {
    handleError();
  }
};

timer = setInterval(gatherJobFolders, jobTimer);
gatherJobFolders();

export const getJobSpace = () => {
  return jobSpace;
};
