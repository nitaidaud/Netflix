import { VerificationToken } from "@prisma/client";
import ISendEmailVerificationRequest from "./ISendVerificationEmailRequest";
import IVerifyResponse from "./IVerifyResponse";

export default interface IVerificationTokenService {
  generateVerificationToken(email: string): Promise<VerificationToken>;
  getVerificationTokenByEmail(email: string): Promise<VerificationToken | null>;
  getVerificationTokenByID(id: string): Promise<VerificationToken | null>;
  deleteVerificationToken(id: string): Promise<void>;
  verifyEmail(tokenId: string): Promise<IVerifyResponse>;
  resetPasswordToken(email: string): Promise<string | null>;
}
