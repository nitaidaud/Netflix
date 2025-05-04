import { OrderStatus, Plan } from "@prisma/client";

export default interface INewOrder {
  id: string;
  userId: string;
  plan: Plan;
  price: number;
  orderStatus: OrderStatus;
}
