import dotenv from "dotenv";
dotenv.config();

export const { DATABASE_URL, PORT, DOMAIN, ORIGIN, CLIENT, JWT_KEY } = process.env;

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

  if (!JWT_KEY) {
    throw new Error("Missing jwt key");
  }
};
