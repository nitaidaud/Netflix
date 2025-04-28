import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env_exports";
import IUserPayload from "../interfaces/IUserPayload";

export const sign = (data: IUserPayload): string => {
  return jwt.sign(data, JWT_KEY!, { expiresIn: "24h" });
};

export const verify = (token: string): IUserPayload | null => {
  try {
    return jwt.verify(token, JWT_KEY!) as IUserPayload;
  } catch (error) {
    return null;
  }
};
