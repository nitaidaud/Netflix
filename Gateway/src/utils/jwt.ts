import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env_exports";
import IAuthPayload from "../interfaces/IAuthPayload";

export const verify = (token: string): IAuthPayload | null => {
  try {
    return jwt.verify(token, JWT_KEY!) as IAuthPayload;
  } catch (error) {
    return null;
  }
};
