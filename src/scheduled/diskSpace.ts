import checkDiskSpace from "check-disk-space";

let info = {
  free: 0,
  size: 0,
};
const path = "/";

export const gatherInfo = async () => {
  const { size, free } = await checkDiskSpace(path);
  info = { size, free };
};

export const getDiskInfo = () => {
  return info;
};
