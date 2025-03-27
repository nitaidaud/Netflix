import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TOKENS } from "../../tokens";
import IUserService from "../interfaces/IUserService";
import LoginRequestDTO from "../DTOs/login.dto";
import SignupRequestDTO from "../DTOs/signup.dto";
import { handleError } from "../utils/handle-error-request";
import ResetPasswordRequestDTO from "../DTOs/reset-password.dto";
import UpdateRequestDTO from "../DTOs/update.dto";
import IVerificationTokenService from "../interfaces/IVerificationToken";
import IBaseSendEmailRequest from "../interfaces/IBaseSendEmailRequest";

@injectable()
export class UserController {
  constructor(
    @inject(TOKENS.IUserService) private userService: IUserService,
    @inject(TOKENS.IVerificationTokenService)
    private verificationTokenService: IVerificationTokenService,
  ) {}

  async signup(req: Request, res: Response) {
    try {
      const data: SignupRequestDTO = req.body;

      const token = await this.userService.signup(data);

      res.cookie(TOKENS.token, token, {
        httpOnly: true,
      });

      res.status(200).json({ message: "signup successfully", token });
    } catch (error) {
      handleError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data: LoginRequestDTO = req.body;

      const token = await this.userService.login(data);

      res.cookie(TOKENS.token, token, {
        httpOnly: true,
      });

      res.status(200).json({ message: "login successfully", token });
    } catch (error) {
      handleError(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie(TOKENS.token, { httpOnly: true });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await this.userService.getUser(id);

      res.status(200).json({ message: "User found", user });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateRequestDTO = req.body;

      const updateUser = await this.userService.updateUser(id, data);

      if (updateUser) {
        res.status(200).json({ message: "User updated", updateUser });
      } else {
        res.status(401).json({ message: "Updating failed" });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async sendVerificationMail(req: Request, res: Response) {
    try {
      const data: IBaseSendEmailRequest = req.body;
      const { email } = data;

      if (!email || email == "") {
        return res.status(400).json({ message: "Email is required" });
      }

      const verificationToken =
        await this.verificationTokenService.generateVerificationToken(email);

      const isSent = await this.userService.sendEmail({
        email,
        tokenId: verificationToken.id,
      });

      if (isSent) {
        res.status(200).json({ message: "Email sent" });
      } else {
        res.status(401).json({ message: "Sending failed" });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: ResetPasswordRequestDTO = req.body;

      const isUpdated = await this.userService.resetPassword(id, data);

      if (isUpdated) {
        res.status(200).json({ message: "Password updated" });
      } else {
        res.status(401).json({ message: "Updating failed" });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async sendMailForgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const isSent = await this.userService.forgotPassword(email);

      if (isSent) {
        res.status(200).json({ message: "Email sent" });
      } else {
        res.status(401).json({ message: "Sending failed" });
      }
    } catch (error) {
      handleError(res, error);
    }
  }
}
