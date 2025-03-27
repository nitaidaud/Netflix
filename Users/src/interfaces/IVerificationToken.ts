import { VerificationToken } from "@prisma/client";

export default interface IVerificationTokenService {
  generateVerificationToken(email: string): Promise<VerificationToken>;
  getVerificationTokenByEmail(email: string): Promise<VerificationToken | null>;
  getVerificationTokenByID(id: string): Promise<VerificationToken | null>;
  resetToken(tokenId: string): Promise<VerificationToken | null>;
  deleteVerificationToken(id: string): Promise<void>;
}
