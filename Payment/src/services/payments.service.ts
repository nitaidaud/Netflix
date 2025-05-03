import {
  CheckoutPaymentIntent,
  OrderRequest,
  OrdersController,
  OrderStatus as PayPalOrderStatus,
} from "@paypal/paypal-server-sdk";
import { inject } from "inversify";
import TOKENS from "../../tokens";
import IPaymentService from "../interfaces/IPaymentService";
import IPaymentRepository from "../interfaces/IPaymentsRepository";
import PaypalClient from "../paypal/paypal.client";

export class PaymentService implements IPaymentService {
  private ordersController = new OrdersController(PaypalClient);

  constructor(
    @inject(TOKENS.IPaymentRepository)
    private paymentRepository: IPaymentRepository,
  ) {}

  async createPayment({
    userId,
    plan,
    price,
    currency,
  }: {
    userId: string;
    plan: "Basic" | "Standard" | "Premium";
    price: number;
    currency: string;
  }): Promise<{ orderId: string; approvalLink: string }> {
    const orderRequest: OrderRequest = {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: currency,
            value: price.toFixed(2),
          },
        },
      ],
    };

    const response = await this.ordersController.createOrder({
      body: {
        ...orderRequest,
        applicationContext: {
          cancelUrl: "http://localhost:5173/",
          returnUrl: "http://localhost:5173/",
        },
      },
    });

    const order = response.result;
    const approvalLink = order.links?.find((l) => l.rel === "approve")?.href;
    if (!approvalLink) throw new Error("No approval link found");

    await this.paymentRepository.saveOrder({
      id: order.id!,
      userId,
      plan,
      price,
      status: "CREATED",
    });

    return {
      orderId: order.id!,
      approvalLink,
    };
  }

  async capturePayment(orderId: string): Promise<void> {
    const response = await this.ordersController.captureOrder({
      id: orderId,
    });

    const result = response.result;
    console.log("result", result);

    if (!result || result.status !== PayPalOrderStatus.Completed) {
      throw new Error("Payment capture failed");
    }

    await this.paymentRepository.updateOrderStatus(orderId, "COMPLETED");
  }
}
