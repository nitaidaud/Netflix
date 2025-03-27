import { VerificationToken } from "@prisma/client";
import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { v4 as uuid } from "uuid";
import { TOKENS } from "../../tokens";
import ITokenRepository from "../interfaces/ITokenRepository";
import IUserRepository from "../interfaces/IUserRepository";
import IVerificationTokenService from "../interfaces/IVerificationToken";
import IVerifyResponse from "../interfaces/IVerifyResponse";

@injectable()
export class VerificationTokenService implements IVerificationTokenService {
  constructor(
    @inject(TOKENS.IVerificationTokenRepository)
    private verificationTokenRepository: ITokenRepository,
    @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async generateVerificationToken(email: string): Promise<VerificationToken> {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 1);

    const existingToken = await this.verificationTokenRepository.findByEmail(
      email,
    );

    if (existingToken)
      await this.verificationTokenRepository.delete(existingToken.id);

    const verificationToken = await this.verificationTokenRepository.generate({
      email,
      token,
      expires,
    });

    return verificationToken;
  }

  async getVerificationTokenByEmail(
    email: string,
  ): Promise<VerificationToken | null> {
    const verificationToken =
      await this.verificationTokenRepository.findByEmail(email);

    if (!verificationToken) throw new Error("Verification token not found");

    return verificationToken;
  }

  async getVerificationTokenByID(
    id: string,
  ): Promise<VerificationToken | null> {
    const verificationToken = await this.verificationTokenRepository.findById(
      id,
    );

    if (!verificationToken) throw new Error("Verification token not found");

    return verificationToken;
  }

  async deleteVerificationToken(id: string): Promise<void> {
    try {
      await this.verificationTokenRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new Error("Error in delete token");
    }
  }

  async verifyEmail(tokenId: string): Promise<IVerifyResponse> {
    const token = await this.verificationTokenRepository.findById(tokenId);

    if (!token) {
      return { success: false, message: "Invalid token" };
    }

    const tokenHasExpired = new Date(token.expires) < new Date();

    if (tokenHasExpired) {
      return { success: false, message: "Token has expired" };
    }

    const user = await this.userRepository.findByEmail(token.email);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    await this.userRepository.updateEmailVerification(user.id, {
      emailVerified: true,
      email: token.email,
    });

    await this.verificationTokenRepository.delete(token.id);

    return { success: true, message: "Email verified successfully" };
  }

  async resetPasswordToken(email: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("User not found");

    const resetPasswordToken = await bcrypt.genSalt();
    const resetPasswordExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); //1 hour

    const resetPasswordTokenId = await this.userRepository.resetPasswordToken(
      user.id,
      {
        resetPasswordToken,
        resetPasswordExpiresAt,
      },
    );

    if (!resetPasswordTokenId) throw new Error("Error in update user");

    return resetPasswordTokenId;
  }
}
