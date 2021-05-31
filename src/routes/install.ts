import { Request, Response, Router } from "express";
import { writeFile } from "fs/promises";
import { isInstalled } from "../config/constants";
import { STATUS_CODES } from "../config/statusCodes";
import { createTables } from "../db/createTables";
import { createUser } from "../db/createUser";
import { generateCrypto } from "../utils/generateSecret";
const router = Router({ mergeParams: true });

router.post("/create/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    typeof password !== "string" ||
    typeof email !== "string"
  ) {
    return res.status(STATUS_CODES.BadRequest).send();
  }

  try {
    await createTables();
    await createUser(email, password, 1);
    await writeFile(isInstalled, "");
    await generateCrypto();
    res.send();
  } catch (error) {
    res.status(STATUS_CODES.ServerError);
  }
});

export const installRoutes = router;
