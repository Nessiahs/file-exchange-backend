/*
 Navicat SQLite Data Transfer

 Source Server         : FileExchange
 Source Server Type    : SQLite
 Source Server Version : 3030001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3030001
 File Encoding         : 65001

 Date: 26/05/2021 13:59:05
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS "files";
CREATE TABLE "files" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "token" TEXT NOT NULL,
  "filename" text NOT NULL,
  "size" integer NOT NULL,
  "hashname" text NOT NULL,
  "created_at" TEXT NOT NULL,
  "downloads" integer DEFAULT 0
);

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS "jobs";
CREATE TABLE "jobs" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "token" TEXT NOT NULL,
  "job_type" TEXT(10) NOT NULL,
  "job_name" TEXT NOT NULL,
  "secret" TEXT,
  "expires" TEXT,
  "created" TEXT,
  "created_by" integer NOT NULL,
  "done" integer(1,1) NOT NULL DEFAULT 0
);

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE sqlite_sequence(name,seq);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "email" TEXT NOT NULL,
  "password" TEXT,
  "salt" TEXT,
  UNIQUE ("id" ASC),
  UNIQUE ("email" ASC)
);

-- ----------------------------
-- Auto increment value for files
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 0 WHERE name = 'files';

-- ----------------------------
-- Auto increment value for jobs
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 0 WHERE name = 'jobs';

-- ----------------------------
-- Auto increment value for user
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 0 WHERE name = 'user';

PRAGMA foreign_keys = true;
