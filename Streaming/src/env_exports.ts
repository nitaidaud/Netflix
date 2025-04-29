import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  DOMAIN,
  ORIGIN,
  CLIENT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  S3_BUCKET,
  HLS_SEGMENT_DURATION,
  TEMP_DIR,
} = process.env;

export const validateEnv = () => {
  if (!PORT) {
    throw new Error("Missing port");
  }

  if (!DOMAIN) {
    throw new Error("Missing domain");
  }

  if (!ORIGIN) {
    throw new Error("Missing origin");
  }

  if (!CLIENT) {
    throw new Error("Missing client");
  }

  if (!AWS_ACCESS_KEY_ID) {
    throw new Error("Missing AWS_ACCESS_KEY_ID");
  }

  if (!AWS_SECRET_ACCESS_KEY) {
    throw new Error("Missing AWS_SECRET_ACCESS_KEY");
  }

  if (!AWS_REGION) {
    throw new Error("Missing AWS_REGION");
  }

  if (!S3_BUCKET) {
    throw new Error("Missing S3_BUCKET");
  }

  if (!HLS_SEGMENT_DURATION) {
    throw new Error("Missing HLS_SEGMENT_DURATION");
  }

  if (!TEMP_DIR) {
    throw new Error("Missing TEMP_DIR");
  }
};
