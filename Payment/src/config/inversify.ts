import { Container } from "inversify";
import TOKENS from "../../tokens";
import { PaymentsPostgressqlRepository } from "../repositories/payments.repository";
import IPaymentRepository from "../interfaces/IPaymentsRepository";
import IPaymentService from "../interfaces/IPaymentService";
import { PaymentService } from "../services/payments.service";

const container = new Container();

const paymentRepository: IPaymentRepository = new PaymentsPostgressqlRepository();

container
    .bind<IPaymentRepository>(TOKENS.IPaymentRepository)
    .toConstantValue(paymentRepository);

    container.bind<IPaymentService>(TOKENS.IUserService).to(PaymentService);

export { container };