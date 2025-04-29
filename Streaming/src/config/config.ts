import fs from "fs";
import { server } from "..";
import AWS from "aws-sdk";
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  TEMP_DIR,
} from "../env_exports";

export const createTempDir = () => {
  const tempDir = TEMP_DIR || "./temp";

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
};

export const configAWS = () => {
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });
  
  return new AWS.S3();
};
