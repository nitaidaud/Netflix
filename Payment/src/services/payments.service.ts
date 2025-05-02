import { inject } from "inversify";
import IPaymentService from "../interfaces/IPaymentService";
import TOKENS from "../../tokens";
import IPaymentRepository from "../interfaces/IPaymentsRepository";
import PaypalClient from "../paypal/paypal.client";
import {
  Order,
  OrderCaptureRequest,
  OrderRequest,
  OrdersController,
} from "@paypal/paypal-server-sdk";

export class PaymentService implements IPaymentService {
  private orderController = new OrdersController(PaypalClient);
  constructor(
    @inject(TOKENS.IPaymentRepository)
    private paymentRepository: IPaymentRepository,
  ) {}

  async createPayment(
    orderRequest: OrderRequest,
  ): Promise<{ orderId: string; approvalLink: string }> {
    try {
      const order = await this.orderController.createOrder({
        body: orderRequest,
      });

      const orderId = order.result.id;
      const approvalLink = order.result.links?.find(
        (link) => link.rel === "approve",
      )?.href;

      if (!orderId) {
        throw new Error("Order ID not found in PayPal response");
      }

      if (!approvalLink) {
        throw new Error("Approval link not found in PayPal response");
      }

      const newOrder = await this.paymentRepository.createOrder({
        orderId,
        status: order.result.status,
        createTime: order.result.createTime,
        intent: order.result.intent,
        links: order.result.links,
        purchaseUnits: order.result.purchaseUnits,
      });

      if (!newOrder) {
        throw new Error("Error creating order in repository");
      }

      return {
        orderId,
        approvalLink,
      };
    } catch (error) {
      console.error("Error creating PayPal payment:", error);
      throw error;
    }
  }

  async capturePayment(
    orderId: string,
  ): Promise<{ captureId: string; status: string; details: any }> {
    try {
      // Capture the payment in PayPal
      const captureRequest = new OrderCaptureRequest(orderId);
      const captureResponse = await this.orderController.captureOrder(
        orderId,
        captureRequest,
      );

      // Extract capture details
      const { status, id } = captureResponse.result;
      const captureId =
        captureResponse.result.purchase_units[0]?.payments?.captures?.[0]?.id;

      if (!captureId) {
        throw new Error("Capture ID not found in PayPal capture response");
      }

      // Store capture details in your repository
      await this.paymentRepository.captureOrder({
        orderId,
        captureId,
        status,
        captureTime: new Date().toISOString(),
        details: captureResponse.result,
      });

      return {
        captureId,
        status,
        details: captureResponse.result,
      };
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      throw error;
    }
  }
}
