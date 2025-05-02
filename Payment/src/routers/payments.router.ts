import { Router } from "express";
import TOKENS from "../../tokens";
import { container } from "../config/inversify";
import { PaymentController } from "../controllers/payments.controller";

const paymentsRouter = Router();

const paymentController = container.get<PaymentController>(
  TOKENS.PaymentController,
);

paymentsRouter.post("/create", paymentController.createPayment);
paymentsRouter.post("/capture", paymentController.capturePayment);

export default paymentsRouter;
