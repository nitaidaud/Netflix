import { VerificationToken } from "@prisma/client";
import IVerificationTokenService from "../interfaces/IVerificationToken.service";

//TODO: implement service for verification token

export class VerificationTokenService implements IVerificationTokenService {
  async generateVerificationToken(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getVerificationTokenByEmail(
    email: string,
  ): Promise<VerificationToken | null> {
    throw new Error("Method not implemented.");
  }
  async getVerificationTokenByID(
    id: string,
  ): Promise<VerificationToken | null> {
    throw new Error("Method not implemented.");
  }
}
