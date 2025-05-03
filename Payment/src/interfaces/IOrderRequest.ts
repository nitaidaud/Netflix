import {
  CheckoutPaymentIntent,
  OrderApplicationContext,
  PurchaseUnitRequest,
} from "@paypal/paypal-server-sdk";
import { Plan } from "@prisma/client";

export default interface IOrderRequest {
  intent: CheckoutPaymentIntent;
  purchaseUnits: PurchaseUnitRequest[];
  applicationContext?: OrderApplicationContext;
  plan: Plan
  price: number
}
