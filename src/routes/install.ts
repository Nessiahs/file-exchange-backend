import { Request, Response, Router } from "express";
import { checkInstall } from "../middleware/checkInstall";
const router = Router({ mergeParams: true });

router.use(checkInstall);

router.get("/check/", (req: Request, res: Response) => {
  res.send();
});

export const installRoutes = router;
