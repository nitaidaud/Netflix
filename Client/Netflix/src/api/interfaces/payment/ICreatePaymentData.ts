import { PlanName } from "@/data/plans";

export default interface ICreatePaymentData {
  plan: PlanName;
  price: number;
  currency: string;
}
