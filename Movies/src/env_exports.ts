import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  ORIGIN,
  MOVIE_API_KEY,
  MOVIE_BASE_URL,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_SOCKET_HOST,
  REDIS_SOCKET_PORT,
} = process.env;

export const validateEnv = () => {
  if (!PORT) {
    throw new Error("Missing port");
  }

  if (!ORIGIN) {
    throw new Error("Missing origin");
  }

  if (!MOVIE_API_KEY) {
    throw new Error("Missing movie api key");
  }

  if (!MOVIE_BASE_URL) {
    throw new Error("Missing movie api base");
  }
  if (!REDIS_USERNAME) {
    throw new Error("Missing redis username");
  }
  if (!REDIS_PASSWORD) {
    throw new Error("Missing redis password");
  }
  if (!REDIS_SOCKET_HOST) {
    throw new Error("Missing redis socket host");
  }
  if (!REDIS_SOCKET_PORT) {
    throw new Error("Missing redis socket port");
  }
};
