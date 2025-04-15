import dotenv from "dotenv";
dotenv.config();

export const { PORT, ORIGIN } = process.env;

export const validateEnv = () => {
  console.log("env:", PORT, ORIGIN);
  
  if (!PORT) {
    throw new Error("Missing port");
  }

  if (!ORIGIN) {
    throw new Error("Missing origin");
  }
};
