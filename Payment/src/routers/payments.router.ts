import { Request, Response, Router } from "express";
import TOKENS from "../../tokens";
import { container } from "../config/inversify";
import { PaymentController } from "../controllers/payments.controller";

const paymentsRouter = Router();

const paymentController = container.get<PaymentController>(
  TOKENS.PaymentController,
);

paymentsRouter.post("/create", (req: Request, res: Response) => {
  paymentController.createPayment(req, res);
});

paymentsRouter.post("/capture/:orderId", (req: Request, res: Response) => {
  paymentController.capturePayment(req, res);
});

export default paymentsRouter;
