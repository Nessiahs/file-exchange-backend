import { jobByToken } from "../db/jobByToken";

export const checkOwner = async (token: string, userId: number) => {
  const { createdBy } = await jobByToken(token);
  if (createdBy === userId) {
    return true;
  }
  return false;
};
