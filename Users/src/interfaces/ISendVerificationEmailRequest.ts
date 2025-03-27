import IBaseSendEmailRequest from "./IBaseSendEmailRequest"

export default interface ISendEmailVerificationRequest extends IBaseSendEmailRequest{
    tokenId: string
}