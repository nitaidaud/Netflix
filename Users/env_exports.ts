import dotenv from "dotenv";
dotenv.config();

export const {
  DATABASE_URL,
  PORT,
  JWT_KEY,
  MAIL_HOST,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  DOMAIN,
  ORIGIN
} = process.env;

export const validateEnv = () => {
  if (!DATABASE_URL) {
    throw new Error("Missing db url");
  }

  if (!JWT_KEY) {
    throw new Error("Missing jwt key");
  }

  if (!PORT) {
    throw new Error("Missing port");
  }

  if (!MAIL_HOST || !MAIL_USERNAME || !MAIL_PASSWORD) {
    throw new Error("Missing mail credentials");
  }

  if (!DOMAIN) {
    throw new Error("Missing domain");
  }

  if (!ORIGIN) {
    throw new Error("Missing origin");
  }
};
