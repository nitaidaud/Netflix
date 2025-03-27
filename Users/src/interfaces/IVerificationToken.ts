import { VerificationToken } from "@prisma/client";
import ISendEmailVerificationRequest from "./ISendVerificationEmailRequest";

export default interface IVerificationTokenService {
  generateVerificationToken(email: string): Promise<VerificationToken>;
  getVerificationTokenByEmail(email: string): Promise<VerificationToken | null>;
  getVerificationTokenByID(id: string): Promise<VerificationToken | null>;
  resetPasswordToken(
    email: string,
  ): Promise<string | null>;
  deleteVerificationToken(id: string): Promise<void>;
}
