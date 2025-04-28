import { compare } from "bcrypt";
import { inject, injectable } from "inversify";
import { TOKENS } from "../../tokens";
import LoginRequestDTO from "../DTOs/login.dto";
import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import IBaseSendEmailRequest from "../interfaces/IBaseSendEmailRequest";
import INodemailerService from "../interfaces/INodemailerService";
import ISendResetPasswordEmail from "../interfaces/ISendResetPasswordEmail";
import ISendEmailVerificationRequest from "../interfaces/ISendVerificationEmailRequest";
import IUser from "../interfaces/IUser";
import IUserRepository from "../interfaces/IUserRepository";
import IUserService from "../interfaces/IUserService";
import { hash } from "../utils/bcrypt";
import { sign } from "../utils/jwt";
import IAuthResponse from "../interfaces/IAuthResponse";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
    @inject(TOKENS.INodemailerService)
    private nodemailerService: INodemailerService,
  ) {}

  async signup(data: SignupRequestDTO): Promise<string> {
    const { email, name, password } = data;

    const isUserExist = await this.userRepository.findByEmail(email);

    if (isUserExist) {
      throw new Error("User already exist");
    }

    const hashedPassword = await hash(password);

    const newUser = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new Error("Error in create user");
    }

    return sign({ id: newUser.id });
  }

  async login(data: LoginRequestDTO): Promise<string> {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid credential");
    }

    return sign({ id: user.id });
  }

  async getUser(id: string): Promise<IUser | null> {
    if (!id || id == "") {
      throw new Error("Not valid id");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  }

  async updateUser(id: string, data: UpdateRequestDTO): Promise<IUser | null> {
    const { name, password } = data;

    if (!name || !password) {
      throw new Error("Invalid data");
    }

    if (!id) {
      throw new Error("ID is required");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found!");
    }

    const hashedPassword = await hash(password);

    const updatedUser = await this.userRepository.updateInfo(id, {
      name,
      password: hashedPassword,
    });

    if (!updatedUser) {
      throw new Error("Error in update user");
    }

    return updatedUser;
  }

  async sendVerificationEmail(
    data: ISendEmailVerificationRequest,
  ): Promise<boolean> {
    const { email } = data;
    if (!email || email == "") {
      throw new Error("Not valid email");
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("user not found, can't send email");
    }

    try {
      await this.nodemailerService.sendVerificationEmail(data);
      console.log("Email sent");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //TODO: check if need to get the confirm password
  async resetPassword(
    token: string,
    data: ResetPasswordRequestDTO,
  ): Promise<IUser | null> {
    const { password } = data;

    if (!password) {
      throw new Error("Invalid data");
    }

    const user = await this.userRepository.findByResetPasswordToken(token);

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    const hashedPassword = await hash(password);

    const updatedUser = await this.userRepository.resetPassword(user.id, {
      password: hashedPassword,
    });

    return updatedUser;
  }

  async forgotPassword(data: ISendResetPasswordEmail): Promise<boolean> {
    const { email } = data;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found!");
    }

    try {
      await this.nodemailerService.sendPasswordResetEmail(data);
      console.log("Email sent");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async sendResetSuccessfulEmail(data: IBaseSendEmailRequest): Promise<void> {
    try {
      await this.nodemailerService.sendResetSuccessfulEmail(data);
    } catch (error) {
      console.error(error);
      throw new Error("Email sending failed!");
    }
  }

  async checkAuth(id: string): Promise<IAuthResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return { isAuthenticated: false, emailVerified: false };
    }

    return {
      isAuthenticated: true,
      emailVerified: user.emailVerified ?? false,
    };
  }
}
