import dotenv from "dotenv";
import { DATABASE_URL, JWT_KEY } from "../env_exports";

dotenv.config();

const start = async () => {
  if (!DATABASE_URL) {
    throw new Error("Missing db url");
  }
  if (!JWT_KEY) {
    throw new Error("Missing jwt key");
  }
};
