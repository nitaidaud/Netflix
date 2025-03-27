import IBaseSendEmailRequest from "./IBaseSendEmailRequest";
import ISendEmailResponse from "./ISendEmailResponse";
import ISendResetPasswordEmail from "./ISendResetPasswordEmail";
import ISendEmailVerificationRequest from "./ISendVerificationEmailRequest";

export default interface INodemailerService {
  sendVerificationEmail(data: ISendEmailVerificationRequest): Promise<void>;
  sendPasswordResetEmail(
    data: ISendResetPasswordEmail,
  ): Promise<ISendEmailResponse>;
  sendResetSuccessfulEmail(data: IBaseSendEmailRequest): Promise<void>;
}
