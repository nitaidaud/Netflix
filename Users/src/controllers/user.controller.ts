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
import { verify } from "../utils/jwt";

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

      // res.cookie(TOKENS.token, token, {
      //   httpOnly: true,
      // });

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
        maxAge: 24 * 60 * 60 * 1000, // 1 day
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
      const { Token } = req.cookies;
      if (!Token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = verify(Token);

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await this.userService.getUser(userId.id);

      res.status(200).json({ message: "User found", ...user });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { Token } = req.cookies;
      if (!Token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = verify(Token);

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const data: UpdateRequestDTO = req.body;

      const updateUser = await this.userService.updateUser(userId.id, data);

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
        return res.status(400).json({ message: "Email is required", success: false });
      }

      const verificationToken =
        await this.verificationTokenService.generateVerificationToken(email);

      const isSent = await this.userService.sendVerificationEmail({
        email,
        tokenId: verificationToken.id,
      });

      if (isSent) {
        res.status(200).json({ message: "Email sent", success: true });
      } else {
        res.status(401).json({ message: "Sending failed", success: false });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { tokenId } = req.params;

      const isVerified = await this.verificationTokenService.verifyEmail(
        tokenId,
      );

      if (isVerified.success) {
        res.status(200).json({ success: true, message: isVerified.message });
      } else {
        res.status(401).json({ success: true, message: isVerified.message });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const data: ResetPasswordRequestDTO = req.body;

      const updatedUser = await this.userService.resetPassword(token, data);

      if (updatedUser) {
        res.status(200).json({ success: true, message: "Password updated" });
        await this.userService.sendResetSuccessfulEmail({
          email: updatedUser.email,
        });
      } else {
        res.status(401).json({ success: false, message: "Updating failed" });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async sendMailForgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const resetToken = await this.verificationTokenService.resetPasswordToken(
        email,
      );

      if (!resetToken) {
        res.status(400).json({ success: false, message: "Email not found" });
        return;
      }

      const isSent = await this.userService.forgotPassword({
        email,
        resetToken,
      });

      if (isSent) {
        res.status(200).json({ success: true, message: "Email sent" });
      } else {
        res.status(401).json({ success: false, message: "Sending failed" });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async checkAuth(req: Request, res: Response) {
    const { Token } = req.cookies;

    if (!Token) {
      return res.json({ isAuthenticated: false, emailVerified: false });
    }

    try {
      const userId = verify(Token);
      if (!userId) {
        return res.json({ isAuthenticated: false, emailVerified: false });
      }
      const authCheck = await this.userService.checkAuth(userId.id);

      console.log("authCheck", authCheck);

      return res.json(authCheck);
    } catch (error) {
      handleError(res, error);
    }
  }

  // async sendResetSuccessfulEmail(req: Request, res: Response) {
  //   try {
  //     const data: IBaseSendEmailRequest = req.body;
  //     await this.userService.sendResetSuccessfulEmail(data);

  //     res.status(200).json({ message: "Email sent" });
  //   } catch (error) {
  //     handleError(res, error);
  //   }
  // }
}
