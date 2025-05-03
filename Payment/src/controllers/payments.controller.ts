import { Request, Response } from "express";
import { inject } from "inversify";
import IPaymentService from "../interfaces/IPaymentService";
import TOKENS from "../../tokens";
import { handleError } from "../utils/handle-error-request";

export class PaymentController {
  constructor(
    @inject(TOKENS.IPaymentService)
    private paymentService: IPaymentService,
  ) {}

  async createPayment(req: Request, res: Response) {
    try {
      const { userId, plan, price, currency } = req.body;

      if (!userId || !plan || !price || !currency) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await this.paymentService.createPayment({
        userId,
        plan,
        price,
        currency,
      });

      return res.status(201).json({
        message: "Payment created successfully",
        order: {
          success: true,
          orderId: result.orderId,
          approvalLink: result.approvalLink,
        },
        success: true,
      });
    } catch (error) {
      console.error("Create Payment Error:", error);
      handleError(res, error);
    }
  }

  async capturePayment(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      if (!orderId) {
        return res.status(400).json({ error: "Order ID is required" });
      }

      await this.paymentService.capturePayment(orderId);

      return res.status(200).json({
        message: "Payment captured successfully",
        success: true,
      });
    } catch (error) {
      console.error("Capture Payment Error:", error);
      handleError(res, error);
    }
  }
}
