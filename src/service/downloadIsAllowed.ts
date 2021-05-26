import { db } from "../db/db";

export const downloadIsAllowed = (
  token: string,
  user: string | number
): Promise<boolean> => {
  const query = "SELECT * FROM uploads WHERE token=$token AND";
  let userCondition = "email=$user";
  if (typeof user === "number") {
    userCondition = "fromUser=$user";
  }

  return new Promise((resolve, reject) => {
    db.get(
      `${query} ${userCondition}`,
      {
        $token: token,
        $user: user,
      },
      (err, result) => {
        if (err || !result) {
          return reject;
        }
        resolve(true);
      }
    );
  });
};
