import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import IUpdateEmailVerification from "./IEmailVerificationRequest";
import IResetPasswordTokenRequest from "./IResetTokenRequest";
import IUser from "./IUser";

export default interface IUserRepository {
  create(data: SignupRequestDTO): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByResetPasswordToken(token: string): Promise<IUser | null>;
  updateInfo(id: string, data: UpdateRequestDTO): Promise<IUser | null>;
  updateEmailVerification(
    id: string,
    data: IUpdateEmailVerification,
  ): Promise<void>;
  resetPassword(
    id: string,
    data: ResetPasswordRequestDTO,
  ): Promise<IUser | null>;
  resetPasswordToken(
    id: string,
    data: IResetPasswordTokenRequest,
  ): Promise<string | null>;
}
