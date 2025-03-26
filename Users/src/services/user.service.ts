import { compare } from "bcrypt";
import { inject, injectable } from "inversify";
import { MAIL_USERNAME } from "../../env_exports";
import { TOKENS } from "../../tokens";
import LoginRequestDTO from "../DTOs/login.dto";
import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import { IMailOptions } from "../interfaces/IMailOptions";
import IUser from "../interfaces/IUser";
import IUserRepository from "../interfaces/IUserRepository";
import IUserService from "../interfaces/IUserService";
import { hash } from "../utils/bcrypt";
import { sign } from "../utils/jwt";
import { sendMail } from "./nodemailer.service";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TOKENS.IUserRepository) private userRepository: IUserRepository,
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

    const updatedUser = await this.userRepository.update(id, {
      name,
      password: hashedPassword,
    });

    if (!updatedUser) {
      throw new Error("Error in update user");
    }

    return updatedUser;
  }

  //TODO: send verification code email
  async sendEmail(id: string): Promise<boolean> {
    if (!id || id == "") {
      throw new Error("Not valid id");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("user not found, can't send email");
    }

    const emailOptions: IMailOptions = {
      from: MAIL_USERNAME!,
      to: user.email,
      subject: "Verification Email",
      html: "<h1>Verify your email</h1><p>Click here to verify your email</p>",
    };
    try {
      await sendMail(emailOptions);
      console.log("Email sent");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async resetPassword(
    id: string,
    data: ResetPasswordRequestDTO,
  ): Promise<boolean> {
    const { password } = data;

    if (!password) {
      throw new Error("Invalid data");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found!");
    }

    const hashedPassword = await hash(password);

    const updatedUser = await this.userRepository.resetPassword(user.id, {
      password: hashedPassword,
    });

    const isUpdated = !!updatedUser;

    return isUpdated;
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found!");
    }

    const emailOptions: IMailOptions = {
      from: MAIL_USERNAME!,
      to: user.email,
      subject: "Reset Password",
      html: "<h1>Reset Password</h1><p>Click here to reset your password</p>",
    };
    try {
      await sendMail(emailOptions);
      console.log("Email sent");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
