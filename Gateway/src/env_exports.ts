import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  ORIGIN,
  USER_SERVICE_URL,
  MOVIES_SERVICE_URL,
  PROFILES_SERVICE_URL,
  STREAMING_SERVICE_URL,
  PAYMENTS_SERVICE_URL,
  JWT_KEY
} = process.env;

export const validateEnv = () => {
  if (!PORT) {
    throw new Error("Missing port");
  }

  if (!ORIGIN) {
    throw new Error("Missing origin");
  }

  if (!USER_SERVICE_URL) {
    throw new Error("Missing user service url");
  }

  if (!MOVIES_SERVICE_URL) {
    throw new Error("Missing movies service url");
  }

  if (!PROFILES_SERVICE_URL) {
    throw new Error("Missing profiles service url");
  }

  if (!STREAMING_SERVICE_URL) {
    throw new Error("Missing streaming service url");
  }

  if (!PAYMENTS_SERVICE_URL) {
    throw new Error("Missing payments service url");
  }

  if (!JWT_KEY) {
    throw new Error("Missing jwt key");
  }
};
