import { injectable } from "inversify";
import { prisma } from "../../prisma/prisma";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import IUser from "../interfaces/IUser";
import IUserRepository from "../interfaces/IUserRepository";
import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import IEmailVerificationRequest from "../interfaces/IEmailVerificationRequest";

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
}
