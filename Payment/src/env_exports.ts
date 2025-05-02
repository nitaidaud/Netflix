import dotenv from "dotenv";
dotenv.config();

export const {
  DATABASE_URL,
  PORT,
  DOMAIN,
  ORIGIN,
  CLIENT,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
} = process.env;

export const validateEnv = () => {
  if (!DATABASE_URL) {
    throw new Error("Missing db url");
  }

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

  if (!OAUTH_CLIENT_ID) {
    throw new Error("Missing oauth client id");
  }

  if (!OAUTH_CLIENT_SECRET) {
    throw new Error("Missing oauth client secret");
  }
};
