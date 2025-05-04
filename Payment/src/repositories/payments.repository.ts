import { Order, OrderStatus, PrismaClient } from "@prisma/client";
import INewOrder from "../interfaces/INewOrder";
import IPaymentRepository from "../interfaces/IPaymentsRepository";

const prisma = new PrismaClient();

export class PaymentRepository implements IPaymentRepository {
  async saveOrder(data: INewOrder): Promise<void> {
    await prisma.order.upsert({
      where: { userId: data.userId },
      create: {
        ...data
      },
      update: {
       ...data
      },
    });
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: status },
    });
  }

  async getOrderByUserId(userId: string): Promise<Order | null> {
    return prisma.order.findFirst({ where: { userId } });
  }
}
