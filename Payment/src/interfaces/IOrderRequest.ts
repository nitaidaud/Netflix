import {
  CheckoutPaymentIntent,
  OrderApplicationContext,
  PurchaseUnitRequest,
} from "@paypal/paypal-server-sdk";

export default interface IOrderRequest {
  intent: CheckoutPaymentIntent;
  purchaseUnits: PurchaseUnitRequest[];
  applicationContext?: OrderApplicationContext;
}
