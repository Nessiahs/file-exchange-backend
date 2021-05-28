import { NextFunction, Request, Response, Router } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { TokenAuth } from "../middleware/TokenAuth";
import { uploadFile } from "../service/fileUpload";
import { verifyUploadToken } from "../service/verifyUploadToken";
const router = Router({ mergeParams: true });

router.get("/verify/:hash/:path", verifyUploadToken);
router.use(TokenAuth);
router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body.tokenData.type === "upload") {
    next();
    return;
  }
  res.status(STATUS_CODES.Forbidden).send();
});

router.post("/file/", uploadFile);
export const uploadRoutes = router;
