import { Order } from "@prisma/client";

export default interface IPaymentRepository {
  createOrder(orderDetails: Order): Promise<boolean>;
  captureOrder(captureDetails: any): Promise<void>;
  getOrderById(orderId: string): Promise<any>;
}
