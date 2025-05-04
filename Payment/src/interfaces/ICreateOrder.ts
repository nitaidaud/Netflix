import { Plan } from "@prisma/client";

export default interface ICreateOrder {
  plan: Plan;
  price: number;
  currency: string;
}
