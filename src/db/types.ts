export type TJobType = "upload" | "download";

export type TUpload = {
  id: number;
  token: string;
  email: string;
  created: string;
  message: string | null;
  fromUser: number;
  expired: string | null;
  subject: string | null;
  info: 0 | 1;
  done: 0 | 1;
};

export type TCustomerUpload = {
  description: string;
  token: string;
  fileCount: number;
  done: 0 | 1;
  expired: string | null;
};

export type TUser = {
  id: number;
  email: string;
  password: string;
  salt: string;
  isAdmin: 0 | 1;
  created: string;
  lastLogin: string;
};

export type TFiles = {
  id: number;
  token: string;
  filename: string;
  hashname: string;
  created: string;
  size?: number;
};

export type TJob = {
  id?: number;
  jobType: TJobType;
  jobName: string;
  secret?: string | null;
  expires?: string | null;
  created?: string;
  privateJob: number;
  token: string;
  createdBy: number;
};
