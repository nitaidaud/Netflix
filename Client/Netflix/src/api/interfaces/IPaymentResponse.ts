import IBaseResponse from "./IBaseRespone";


export interface IPaymentStatusResponse extends IBaseResponse {
  success: boolean;
  hasActiveOrder: boolean;
}
