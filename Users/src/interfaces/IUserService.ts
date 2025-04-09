import LoginRequestDTO from "../DTOs/login.dto";
import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import IAuthResponse from "./IAuthResponse";
import IBaseSendEmailRequest from "./IBaseSendEmailRequest";
import ISendResetPasswordEmail from "./ISendResetPasswordEmail";
import ISendEmailVerificationRequest from "./ISendVerificationEmailRequest";
import IUser from "./IUser";

export default interface IUserService {
  signup(data: SignupRequestDTO): Promise<string>;
  login(data: LoginRequestDTO): Promise<string>;
  getUser(id: string): Promise<IUser | null>;
  updateUser(id: string, data: UpdateRequestDTO): Promise<IUser | null>;
  sendVerificationEmail(data: ISendEmailVerificationRequest): Promise<boolean>;
  resetPassword(token: string, data: ResetPasswordRequestDTO): Promise<IUser | null>;
  forgotPassword(data: ISendResetPasswordEmail): Promise<boolean>;
  sendResetSuccessfulEmail(data: IBaseSendEmailRequest): Promise<void>;
  checkAuth(id: string): Promise<IAuthResponse>;
}
