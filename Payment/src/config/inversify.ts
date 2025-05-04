import { Container } from "inversify";
import TOKENS from "../../tokens";
import IPaymentRepository from "../interfaces/IPaymentsRepository";
import IPaymentService from "../interfaces/IPaymentService";
import { PaymentService } from "../services/payments.service";
import { PaymentRepository } from "../repositories/payments.repository";
import { PaymentController } from "../controllers/payments.controller";

const container = new Container();

const paymentRepository: IPaymentRepository = new PaymentRepository();

container
  .bind<IPaymentRepository>(TOKENS.IPaymentRepository)
  .toConstantValue(paymentRepository);

container.bind<IPaymentService>(TOKENS.IPaymentService).to(PaymentService);

container
  .bind<PaymentController>(TOKENS.PaymentController)
  .to(PaymentController);

export { container };
