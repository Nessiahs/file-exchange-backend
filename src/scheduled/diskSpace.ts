import checkDiskSpace from "check-disk-space";

let info = {
  free: 0,
  size: 0,
};
const path = "/";

export const gatherInfo = async () => {
  try {
    const { size, free } = await checkDiskSpace(path);
    info = { size, free };
  } catch (error) {}
};

export const getDiskInfo = () => {
  return info;
};
