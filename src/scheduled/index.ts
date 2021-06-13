import { scheduleJob } from "node-schedule";
import { deleteExpiredJobs } from "./deleteExpiredJobs";
import { gatherInfo } from "./diskSpace";
import { gatherJobSizes } from "./jobSpace";

const fiveMinutes = "*/5 * * * *";

export const schedule = () => {
  gatherInfo();
  gatherJobSizes();
  scheduleJob(fiveMinutes, gatherInfo);
  scheduleJob(fiveMinutes, gatherJobSizes);
  scheduleJob("10 1 * * *", deleteExpiredJobs);
};
