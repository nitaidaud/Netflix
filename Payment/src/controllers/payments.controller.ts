import { Request, Response } from "express";
import { inject } from "inversify";
import IPaymentService from "../interfaces/IPaymentService";
import TOKENS from "../../tokens";
import { handleError } from "../utils/handle-error-request";
import { verify } from "../utils/jwt";
import ICreateOrder from "../interfaces/ICreateOrder";

export class PaymentController {
  constructor(
    @inject(TOKENS.IPaymentService)
    private paymentService: IPaymentService,
  ) {}

  async createPayment(req: Request, res: Response) {
    try {
      const { plan, price, currency }: ICreateOrder = req.body;

      const Token: string = req.cookies.Token;
      const userPayload = verify(Token);

      if (!userPayload?.id || !plan || !price || !currency) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await this.paymentService.createPayment({
        userId: userPayload.id,
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
      const Token = req.cookies.Token;
      const userPayload = verify(Token);

      if (!userPayload?.id) {
        return res
          .status(400)
          .json({ success: false, message: "Unauthorized" });
      }

      await this.paymentService.capturePayment(userPayload?.id);

      return res.status(200).json({
        message: "Payment captured successfully",
        success: true,
      });
    } catch (error) {
      console.error("Capture Payment Error:", error);
      handleError(res, error);
    }
  }

  async checkPayment(req: Request, res: Response) {
    try {
      const Token = req.cookies.Token;
      const userPayload = verify(Token);

      if (!userPayload) {
        return res
          .status(400)
          .json({ success: false, message: "Unauthorized" });
      }

      const hasPayment = await this.paymentService.checkPayment(userPayload.id);

      return res.status(200).json({
        message: "Payment captured successfully",
        success: hasPayment,
      });
    } catch (error) {
      console.error("Capture Payment Error:", error);
      handleError(res, error);
    }
  }
}
