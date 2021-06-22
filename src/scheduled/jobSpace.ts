import { lstat, readdir } from "fs/promises";
import getFolderSize from "get-folder-size";
import path from "path";
import { filePath } from "../config/constants";
import { db } from "../db/db";
type TJobSpace = {
  [key: string]: {
    size: number;
    color: string;
  };
};

type TResult = {
  token: string;
};

let jobSpace: TJobSpace = {};

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

export const gatherJobSizes = async () => {
  const validToken = await getAllJobs();

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
};

export const getJobSpace = () => {
  return jobSpace;
};
