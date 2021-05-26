import path from "path";
import sqlite3 from "sqlite3";
export const db = new sqlite3.Database(
  path.resolve(__dirname, "../../db/fileExchange.db"),
  (err) => {
    if (err) {
      console.log("cant connect to database", err);
    } else {
      console.log("Connected to database");
    }
  }
);
