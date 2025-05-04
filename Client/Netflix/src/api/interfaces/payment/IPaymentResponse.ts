import IBaseResponse from "../IBaseRespone";


export interface IPaymentStatusResponse extends IBaseResponse {
  paymentStatus: {
    orderStatus: "pending" | "success" | "failed" | null;
    hasPayment: boolean;
  };
}
