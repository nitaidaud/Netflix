import { Order } from "@prisma/client";

export default interface IPaymentRepository {
  saveOrder(data: {
    id: string;
    userId: string;
    plan: "Basic" | "Standard" | "Premium";
    price: number;
    status: "CREATED";
  }): Promise<void>;

  updateOrderStatus(orderId: string, status: string): Promise<void>;

  getOrderByUserId(userId: string): Promise<Order | null>;
}

