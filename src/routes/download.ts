import { NextFunction, Request, Response, Router } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { TokenAuth } from "../middleware/TokenAuth";
import { userDownload } from "../service/userDownload";
import { userFileList } from "../service/userFileList";
const router = Router({ mergeParams: true });

router.use(TokenAuth);
router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body.tokenData.type === "download" && req.body.tokenData.token) {
    next();
    return;
  }
  res.status(STATUS_CODES.Forbidden).send();
});

router.get("/file-list/", userFileList);
router.get("/file/:hashname", userDownload);

export const downloadRoutes = router;
