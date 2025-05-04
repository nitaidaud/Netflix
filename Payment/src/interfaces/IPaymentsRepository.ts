import { Order } from "@prisma/client";
import INewOrder from "./INewOrder";

export default interface IPaymentRepository {
  saveOrder(data: INewOrder): Promise<void>;

  updateOrderStatus(orderId: string, status: string): Promise<void>;

  getOrderByUserId(userId: string): Promise<Order | null>;
}
