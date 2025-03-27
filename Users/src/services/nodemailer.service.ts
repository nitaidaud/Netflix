import nodemailer from "nodemailer";
import winston from "winston";
import dotenv from "dotenv";
import { IMailOptions } from "../interfaces/IMailOptions";
import { injectable } from "inversify";
import INodemailerService from "../interfaces/INodemailerService";
import IBaseSendEmailRequest from "../interfaces/IBaseSendEmailRequest";
import ISendEmailResponse from "../interfaces/ISendEmailResponse";
import ISendResetPasswordEmail from "../interfaces/ISendResetPasswordEmail";
import ISendEmailVerificationRequest from "../interfaces/ISendVerificationEmailRequest";
import {
  DOMAIN,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_USERNAME,
} from "../../env_exports";

@injectable()
export class NodemailerService implements INodemailerService {
  private domain = DOMAIN!;

  private logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  private sendMail = async (data: IMailOptions) => {
    const transporter = nodemailer.createTransport({
      service: MAIL_HOST,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    const { to } = data;

    this.logger.info(`Sending mail to - ${to}`);

    transporter.sendMail(data, (error, info) => {
      if (error) {
        this.logger.error(error);
        throw new Error(error.message);
      } else {
        this.logger.info("Email sent: " + info.response);
      }
    });
  };

  async sendVerificationEmail(
    data: ISendEmailVerificationRequest,
  ): Promise<void> {
    try {
      const { email, tokenId } = data;
      const confirmationLink = `${this.domain}/verify-email?token=${tokenId}`;

      const mail: IMailOptions = {
        from: MAIL_USERNAME!,
        to: email,
        subject: "verify your email",
        html: `<p>Click <a href=${confirmationLink}>here</a> to verify your email`,
      };

      await this.sendMail(mail);
    } catch (error) {
      console.error(error);
      throw new Error("Email sending failed!");
    }
  }

  async sendPasswordResetEmail(
    data: ISendResetPasswordEmail,
  ): Promise<ISendEmailResponse> {
    try {
      const { email, resetToken } = data;
      const resetPasswordLink = `${this.domain}/auth/reset-password?token=${resetToken}`;

      const mail: IMailOptions = {
        from: MAIL_USERNAME!,
        to: email,
        subject: "reset your password",
        html: `<p>Click <a href=${resetPasswordLink}>here</a> to reset your password`,
      };

      await this.sendMail(mail);
      return { success: true, message: "Email send successfully!" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Email sending failed!" };
    }
  }

  async sendResetSuccessfulEmail(data: IBaseSendEmailRequest): Promise<void> {
    const { email } = data;
    try {
      const dashboardLink = `${this.domain}/dashboard`;

      const mail: IMailOptions = {
        from: MAIL_USERNAME!,
        to: email,
        subject: "Password reset was successful",
        html: `<p>Click <a href=${dashboardLink}>here</a> to go to your dashboard`,
      };

      await this.sendMail(mail);
    } catch (error) {
      console.error(error);
      throw new Error("Email sending failed!");
    }
  }
}
