import { inject } from "inversify";
import TOKENS from "../../tokens";
import IPaymentService from "../interfaces/IPaymentService";
import { Request, Response } from "express";
import {
  CheckoutPaymentIntent,
  Order,
  OrderRequest,
} from "@paypal/paypal-server-sdk";
import { CLIENT } from "../env_exports";
import IOrderRequest from "../interfaces/IOrderRequest";
import { handleError } from "../utils/handle-error-request";

export class PaymentController {
  constructor(
    @inject(TOKENS.IPaymentService) private paymentService: IPaymentService,
  ) {}

  async createPayment(req: Request, res: Response) {
    try {
      const orderRequest: IOrderRequest = req.body;

      if (!orderRequest.purchaseUnits || !orderRequest.purchaseUnits.length) {
        throw new Error("Purchase units are required");
      }

      const result = await this.paymentService.createPayment(orderRequest);

      res.status(201).json({
        message: "Payment created successfully",
        order: {
          success: true,
          orderId: result.orderId,
          approvalLink: result.approvalLink,
        },
        success: true,
      });
    } catch (error) {
      console.error("Error in createPayment controller:", error);
      handleError(res, error);
    }
  }

  async capturePayment() {
    await this.paymentService.capturePayment();
  }
}
