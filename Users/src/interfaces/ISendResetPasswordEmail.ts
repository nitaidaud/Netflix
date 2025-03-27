import IBaseSendEmailRequest from "./IBaseSendEmailRequest";

export default interface ISendResetPasswordEmail extends IBaseSendEmailRequest {
  resetToken: string;
}
