import dotenv from "dotenv";
dotenv.config();

export const { PORT, ORIGIN,  MOVIE_API_KEY, MOVIE_BASE_URL} = process.env;

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
};
