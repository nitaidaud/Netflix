import IBaseResponse from "./IBaseRespone";

export default interface ICreatePaymentResponse extends IBaseResponse {
  order?: {
    success: boolean;
    orderId: string;
    approvalLink: string;
  };
  success: boolean;
}
