import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env_exports";
import IProfilePayload from "../Interfaces/IUserPayload";

export const sign = (data: IProfilePayload): string => {
  return jwt.sign(data, JWT_KEY!, { expiresIn: "24h" });
};

export const verify = (token: string): IProfilePayload | null => {
  try {
    const payload = jwt.verify(token, JWT_KEY!) as IProfilePayload;
    return payload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
};
