export type JwtData = {
  id?: number;
  type: "upload" | "download" | "admin";
  verified?: boolean;
  token?: string;
};

export type JwtContent = { iat?: number; exp?: number; data: JwtData };
