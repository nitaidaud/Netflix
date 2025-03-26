import { VerificationToken } from "@prisma/client";

export default interface IVerificationTokenService {
  generateVerificationToken(email: string): Promise<void>;
  getVerificationTokenByEmail(email: string): Promise<VerificationToken | null>;
  getVerificationTokenByID(id: string): Promise<VerificationToken | null>;
}
