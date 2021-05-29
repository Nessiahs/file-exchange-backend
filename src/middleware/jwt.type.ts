export type JwtData = {
  id?: number;
  type: "upload" | "download" | "admin";
  verified?: boolean;
  token?: string;
  isAdmin?: 0 | 1;
};

export type JwtContent = { iat?: number; exp?: number; data: JwtData };
