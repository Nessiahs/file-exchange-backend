import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import "./config/jwt";
import "./db/db";
import { adminRoutes } from "./routes/admin";
import { downloadRoutes } from "./routes/download";
import { uploadRoutes } from "./routes/upload";
import { Auth } from "./service/Auth";
import { verifyJob } from "./service/verifyJob";
import { verifySecret } from "./service/verifySecret";
const port = 8080; // default port to listen
const app = express();

app.disable("x-powered-by");

app.use(
  express.json({
    limit: "2gb",
  })
); // for parsing application/json
app.use(
  express.urlencoded({
    limit: "2gb",
    extended: true,
  })
);
app.get("/verify-job/", verifyJob);
app.post("/verify-secret/", verifySecret);
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../tmp"),
  })
);
app.post("/login/", Auth);
app.use("/upload", uploadRoutes);
app.use("/admin", adminRoutes);
app.use("/download", downloadRoutes);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
