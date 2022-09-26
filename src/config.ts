import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "path";

const getVariableSync = (key: string): string |  undefined => {
  if (
    ["production", "stage", "development"].includes(process.env.NODE_ENV || "")
  ) {
    return process.env[key];
  } else {
    return dotenv.parse(fs.readFileSync(path.join(__dirname, "../.env")))[key];
  }
};

export { getVariableSync };
