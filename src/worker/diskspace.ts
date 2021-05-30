import checkDiskSpace from "check-disk-space";
import { jobTimer } from "../config/constants";

let info = {
  free: 0,
  size: 0,
};
const path = "/";

let timer: NodeJS.Timeout;
let errorCount = 0;
const gatherInfo = async () => {
  try {
    const { size, free } = await checkDiskSpace(path);
    info = { size, free };
    errorCount = 0;
  } catch (error) {
    if (errorCount === 3) {
      clearInterval(timer);
      info = {
        free: 0,
        size: 0,
      };
      return;
    }
    ++errorCount;
  }
};
timer = setInterval(gatherInfo, jobTimer);
gatherInfo();

export const getDiskInfo = () => {
  return info;
};
