import dotenv from "dotenv";
dotenv.config();

export const { PORT, DOMAIN, ORIGIN } = process.env;

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
};
