import LoginRequestDTO from "../DTOs/login.dto";
import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import IUser from "./IUser";

export default interface IUserService {
  signup(data: SignupRequestDTO): Promise<string>;
  login(data: LoginRequestDTO): Promise<string>;
  getUser(id: string): Promise<IUser | null>;
  updateUser(id: string, data: UpdateRequestDTO): Promise<IUser | null>;
  sendEmail(id: string): Promise<boolean>;
  resetPassword(id: string, data: ResetPasswordRequestDTO): Promise<boolean>;
  forgotPassword(email: string): Promise<boolean>;
}
