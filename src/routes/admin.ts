import { NextFunction, Request, Response, Router } from "express";
import { STATUS_CODES } from "../config/statusCodes";
import { TokenAuth } from "../middleware/TokenAuth";
import { addUser } from "../service/addUser";
import { adminDownload } from "../service/adminDownload";
import { adminJobInfo } from "../service/adminJobInfo";
import { adminUpload } from "../service/adminUpload";
import { auth } from "../service/auth";
import { createJob } from "../service/createJob";
import { deleteFile } from "../service/deleteFile";
import { deleteUser } from "../service/deleteUser";
import { hddStats } from "../service/hddStats";
import { isLogedIn } from "../service/isLogedIn";
import { jobByType } from "../service/jobsByType";
import { usersList } from "../service/usersList";
import { verifyEmail } from "../service/verifyEmail";

const router = Router({ mergeParams: true });
router.post("/login/", auth);
router.use(TokenAuth);
// Token must be from type admin
router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body.tokenData.type === "admin") {
    next();
    return;
  }
  res.status(STATUS_CODES.Forbidden).send();
});
router.get("disk-space", hddStats);
router.get("/status/", isLogedIn);
router.get("/download/:folder/:file/", adminDownload);
router.get("/jobs/:jobType/", jobByType);
router.post("/create/", createJob);
router.get("/info/:token/:jobType", adminJobInfo);
router.post("/upload/file/:token", adminUpload);
router.delete("/file/:id", deleteFile);

// From here the user need to be admin
router.use((req: Request, res: Response, next: NextFunction) => {
  const { isAdmin } = req.body.tokenData;

  if (isAdmin === 1) {
    next();
  } else {
    res.status(STATUS_CODES.Forbidden);
  }
});

router.delete("/user/:id", deleteUser);
router.post("/verify-email/", verifyEmail);
router.get("/users/", usersList);
router.post("/add-user/", addUser);

export const adminRoutes = router;
