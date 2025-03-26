import nodemailer from "nodemailer";
import winston from "winston";
import dotenv from "dotenv";
import { IMailOptions } from "../interfaces/IMailOptions";
dotenv.config();

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const sendMail = async (data: IMailOptions) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const { to } = data;

  logger.info(`Sending mail to - ${to}`);

  transporter.sendMail(data, (error, info) => {
    if (error) {
      logger.error(error);
      throw new Error(error.message);
    } else {
      logger.info("Email sent: " + info.response);
    }
  });
};
