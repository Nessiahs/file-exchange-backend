import { db } from "./db";

const run = (query: string) => {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
};

export const createTables = () => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(async () => {
        await run("PRAGMA foreign_keys=OFF;");
        await run("BEGIN TRANSACTION;");

        await run(`CREATE TABLE "files" (
          "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
          "token" TEXT NOT NULL,
          "filename" text NOT NULL,
          "size" integer NOT NULL,
          "hashname" text NOT NULL,
          "created_at" TEXT NOT NULL,
          "downloads" integer DEFAULT 0
        );`);

        await run(`CREATE TABLE "jobs" (
          "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          "token" TEXT NOT NULL,
          "job_type" TEXT(10) NOT NULL,
          "job_name" TEXT NOT NULL,
          "secret" TEXT,
          "expires" TEXT,
          "created" TEXT,
          "created_by" integer NOT NULL,
          "done" integer(1,1) NOT NULL DEFAULT 0
        );`);

        await run(`CREATE TABLE "user" (
          "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          "email" TEXT NOT NULL,
          "password" TEXT,
          "salt" TEXT,
          UNIQUE ("id" ASC),
          UNIQUE ("email" ASC)
        );`);

        await run("PRAGMA foreign_keys=ON;");
        await run("COMMIT;");
        resolve(true);
      });
    } catch (error) {
      reject();
    }
  });
};