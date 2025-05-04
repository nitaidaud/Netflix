import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env_exports";
import ITokenPayload from "../Interfaces/IUserPayload";

export const sign = (data: ITokenPayload): string => {
  return jwt.sign(data, JWT_KEY!, { expiresIn: "24h" });
};

export const verify = (token: string): ITokenPayload | null => {
  try {
    const payload = jwt.verify(token, JWT_KEY!) as ITokenPayload;
    return payload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
};
