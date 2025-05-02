import {
  CheckoutPaymentIntent,
  OrderApplicationContext,
  Payer,
  PaymentSource,
  PurchaseUnitRequest,
} from "@paypal/paypal-server-sdk";

export default interface IOrder {
  intent: CheckoutPaymentIntent;
  payer?: Payer;
  purchaseUnits: PurchaseUnitRequest[];
  paymentSource?: PaymentSource;
  applicationContext?: OrderApplicationContext;
}
