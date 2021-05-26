import { JwtData } from "../middleware/jwt.type";

export const isJobType = (type: string | string[]): type is JwtData["type"] => {
  if (Array.isArray(type)) {
    return false;
  }
  const allowedTypes = ["download", "upload"];
  return allowedTypes.includes(type);
};
