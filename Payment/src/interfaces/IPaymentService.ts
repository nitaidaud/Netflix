import { OrderCaptureRequest, OrderRequest } from "@paypal/paypal-server-sdk";

export default interface IPaymentService {
    createPayment(orderRequest: OrderRequest): Promise<{ orderId: string, approvalLink: string }>;
  capturePayment(orderId: string): Promise<{ captureId: string, status: string, details: any }>;
}