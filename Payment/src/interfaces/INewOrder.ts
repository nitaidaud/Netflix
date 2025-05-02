import {
  CheckoutPaymentIntent,
  LinkDescription,
  PurchaseUnit,
} from "@paypal/paypal-server-sdk";
import { OrderStatus } from "@prisma/client";

export default interface INewOrder {
  orderId: string;
  status: OrderStatus;
  createTime: string;
  intent?: CheckoutPaymentIntent;
  links?: LinkDescription[];
  purchaseUnits?: PurchaseUnit[];
}
