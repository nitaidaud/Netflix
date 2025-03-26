import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import IUser from "./IUser";

export default interface IUserRepository {
  create(data: SignupRequestDTO): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  update(id: string, data: UpdateRequestDTO): Promise<IUser | null>;
  resetPassword(id: string, data: ResetPasswordRequestDTO): Promise<IUser | null>;
}
