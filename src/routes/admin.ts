import { NextFunction, Request, Response, Router } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { TokenAuth } from "../middleware/TokenAuth";
import { adminDownload } from "../service/adminDownload";
import { adminJobInfo } from "../service/adminJobInfo";
import { adminUpload } from "../service/adminUpload";
import { Auth } from "../service/Auth";
import { createJob } from "../service/createJob";
import { deleteFile } from "../service/deleteFile";
import { isLogedIn } from "../service/isLogedIn";
import { jobByType } from "../service/jobsByType";

const router = Router({ mergeParams: true });
router.post("/login/", Auth);
router.use(TokenAuth);
// Token must be from type admin
router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body.tokenData.type === "admin") {
    next();
    return;
  }
  res.status(STATUS_CODES.Forbidden).send();
});
router.get("/download/:folder/:file/", adminDownload);
router.get("/jobs/:jobType/", jobByType);
router.get("/status/", isLogedIn);
router.post("/create/", createJob);
router.get("/info/:token/:jobType", adminJobInfo);
router.post("/upload/file/:token", adminUpload);
router.delete("/file/:id", deleteFile);

export const adminRoutes = router;
