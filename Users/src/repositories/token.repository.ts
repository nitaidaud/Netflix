import { VerificationToken } from "@prisma/client";
import ITokenRepository from "../interfaces/ITokenRepository";
import { prisma } from "../../prisma/prisma";
import { injectable } from "inversify";
import IBaseToken from "../interfaces/IBaseToken";

@injectable()
export class TokenRepository implements ITokenRepository {
  async generate(data: IBaseToken): Promise<VerificationToken> {
    const verificationToken = await prisma.verificationToken.create({
      data,
    });

    return verificationToken;
  }

  async findById(id: string): Promise<VerificationToken | null> {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        id,
      },
    });
    return verificationToken;
  }

  async findByEmail(email: string): Promise<VerificationToken | null> {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  }

  async delete(id: string): Promise<void> {
    await prisma.verificationToken.delete({
      where: {
        id,
      },
    });
  }
}
