import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env_exports";
import ITokenPayload from "../interfaces/ITokenPayload";

export const sign = (data: ITokenPayload): string => {
  return jwt.sign(data, JWT_KEY!, { expiresIn: "24h" });
};

export const verify = (token: string): ITokenPayload | null => {
  try {
    return jwt.verify(token, JWT_KEY!) as ITokenPayload;
  } catch (error) {
    return null;
  }
};
