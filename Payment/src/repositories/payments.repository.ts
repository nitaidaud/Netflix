import { Order } from "@prisma/client";
import { injectable } from "inversify";
import { prisma } from "../../prisma/prisma";
import IPaymentsRepository from "../interfaces/IPaymentsRepository";

@injectable()
export class PaymentsPostgressqlRepository implements IPaymentsRepository {
  async createOrder(newOrder: Order): Promise<boolean> {
    const order = await prisma.order.create({
      data: newOrder,
    });

    return !!order;
  }
  captureOrder(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getOrderById(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
