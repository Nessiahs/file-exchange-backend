import jwt from "jsonwebtoken";
import { JWT_KEY, JWT_SIGN_CONFIG, JWT_VERIFY_CONFIG } from "../config/jwt";
import { JwtContent, JwtData } from "../middleware/jwt.type";

export const verifyToken = (
  token: string,
  type: JwtData["type"] = null
): Promise<{
  token: string;
  content: JwtContent;
}> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_KEY,
      JWT_VERIFY_CONFIG,
      (err, content: JwtContent) => {
        if (err || (type && type !== content.data.type)) {
          reject();
          return;
        }
        delete content.exp;
        const reSign = jwt.sign(content, JWT_KEY, JWT_SIGN_CONFIG);

        resolve({ token: reSign, content });
      }
    );
  });
};
