import { injectable } from "inversify";
import { prisma } from "../../prisma/prisma";
import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import IEmailVerificationRequest from "../interfaces/IEmailVerificationRequest";
import IResetTokenRequest from "../interfaces/IResetTokenRequest";
import IUser from "../interfaces/IUser";
import IUserRepository from "../interfaces/IUserRepository";

@injectable()
export class UserPostgressqlRepository implements IUserRepository {
  async create(data: SignupRequestDTO): Promise<IUser | null> {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser || null;
  }

  findByEmail(email: string): Promise<IUser | null> {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  findById(id: string): Promise<IUser | null> {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  updateInfo(id: string, data: UpdateRequestDTO): Promise<IUser | null> {
    const user = prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  }

  resetPassword(
    id: string,
    data: ResetPasswordRequestDTO,
  ): Promise<IUser | null> {
    const user = prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  }

  async updateEmailVerification(
    id: string,
    data: IEmailVerificationRequest,
  ): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async resetPasswordToken(
    id: string,
    data: IResetTokenRequest,
  ): Promise<string | null> {
    const { resetPasswordExpiresAt, resetPasswordToken } = data;
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpiresAt: new Date(resetPasswordExpiresAt),
      },
    });

    return user.resetPasswordToken;
  }
}
