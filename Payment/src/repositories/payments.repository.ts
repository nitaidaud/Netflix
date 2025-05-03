import { OrderStatus, Plan, PrismaClient } from "@prisma/client";
import IPaymentRepository from "../interfaces/IPaymentsRepository";

const prisma = new PrismaClient();

export class PaymentRepository implements IPaymentRepository {
  async saveOrder(data: {
    id: string;
    userId: string;
    plan: Plan;
    price: number;
    status: OrderStatus;
  }): Promise<void> {
    await prisma.order.create({
      data: {
        id: data.id,
        userId: data.userId,
        plan: data.plan,
        price: data.price,
        orderStatus: data.status,
      },
    });
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: status },
    });
  }
}
