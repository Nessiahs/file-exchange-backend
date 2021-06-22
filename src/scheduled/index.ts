import { scheduleJob } from "node-schedule";
import { deleteExpiredJobs } from "./deleteExpiredJobs";
import { gatherInfo } from "./diskSpace";
import { gatherJobSizes } from "./jobSpace";

const fiveMinutes = "*/5 * * * *";

type TJobState = {
  state: boolean;
  lastExecute: Date;
  failCount: number;
  executed: number;
};

const jobState: Record<string, TJobState> = {
  info: {
    state: false,
    lastExecute: null,
    failCount: 0,
    executed: 0,
  },
  jobs: {
    state: false,
    lastExecute: null,
    failCount: 0,
    executed: 0,
  },
  expiredJobs: {
    state: false,
    lastExecute: null,
    failCount: 0,
    executed: 0,
  },
};

export const getJobState = () => {
  return jobState;
};

const gatherJobs = async () => {
  let state = true;
  try {
    await gatherInfo();
    state = true;
  } catch (error) {
    state = false;
  } finally {
    jobState.info = {
      state,
      lastExecute: new Date(),
      executed: ++jobState.info.executed,
      failCount: state ? jobState.info.failCount : ++jobState.info.failCount,
    };
  }
  state = true;

  try {
    await gatherJobSizes();
  } catch (error) {
    state = false;
  } finally {
    jobState.jobs = {
      state,
      lastExecute: new Date(),
      executed: ++jobState.jobs.executed,
      failCount: state ? jobState.jobs.failCount : ++jobState.jobs.failCount,
    };
  }
};

export const schedule = () => {
  gatherJobs();
  scheduleJob(fiveMinutes, gatherJobs);

  scheduleJob("0 1 * * *", async () => {
    let state = true;
    try {
      await deleteExpiredJobs();
    } catch (error) {
      state = false;
    } finally {
      jobState.expiredJobs = {
        state,
        lastExecute: new Date(),
        executed: ++jobState.expiredJobs.executed,
        failCount: state
          ? jobState.expiredJobs.failCount
          : ++jobState.expiredJobs.failCount,
      };
    }
  });
};
