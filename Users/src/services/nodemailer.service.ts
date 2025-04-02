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
  ORIGIN,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_USERNAME,
} from "../../env_exports";

@injectable()
export class NodemailerService implements INodemailerService {
  private origin = ORIGIN!;
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
      const confirmationLink = `${this.origin}/verify-email?token=${tokenId}`;
      const mail: IMailOptions = {
        from: MAIL_USERNAME!,
        to: email,
        subject: "Verify Your Email",
        html: `
          <div style="background-color: #111; color: #fff; padding: 40px; text-align: center; font-family: Arial, sans-serif;">
            <h1 style="color: #E50914;">Welcome to Our Service</h1>
            <p style="font-size: 18px;">Please verify your email by clicking the button below:</p>
            <a href="${confirmationLink}" style="background: #E50914; color: #fff; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Verify Email</a>
            <p style="font-size: 14px;">If you didn't request this, please ignore this email.</p>
          </div>`
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
      const resetPasswordLink = `${this.origin}/reset-password?token=${resetToken}`;
      const mail: IMailOptions = {
        from: MAIL_USERNAME!,
        to: email,
        subject: "Reset Your Password",
        html: `
          <div style="background-color: #111; color: #fff; padding: 40px; text-align: center; font-family: Arial, sans-serif;">
            <h1 style="color: #E50914;">Password Reset Request</h1>
            <p style="font-size: 18px;">Click the button below to reset your password:</p>
            <a href="${resetPasswordLink}" style="background: #E50914; color: #fff; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Reset Password</a>
            <p style="font-size: 14px;">If you didn't request this, please ignore this email.</p>
          </div>`
      };
      await this.sendMail(mail);
      return { success: true, message: "Email sent successfully!" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Email sending failed!" };
    }
  }

  async sendResetSuccessfulEmail(data: IBaseSendEmailRequest): Promise<void> {
    const { email } = data;
    try {
      const dashboardLink = `${this.origin}/`;
      const mail: IMailOptions = {
        from: MAIL_USERNAME!,
        to: email,
        subject: "Password Reset Successful",
        html: `
          <div style="background-color: #111; color: #fff; padding: 40px; text-align: center; font-family: Arial, sans-serif;">
            <h1 style="color: #E50914;">Password Reset Successful</h1>
            <p style="font-size: 18px;">Your password has been reset successfully.</p>
            <a href="${dashboardLink}" style="background: #E50914; color: #fff; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
          </div>`
      };
      await this.sendMail(mail);
    } catch (error) {
      console.error(error);
      throw new Error("Email sending failed!");
    }
  }
}