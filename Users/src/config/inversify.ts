import { Container } from "inversify";
import IUserService from "../interfaces/IUserService";
import { UserService } from "../services/user.service";
import { TOKENS } from "../../tokens";
import IUserRepository from "../interfaces/IUserRepository";
import { UserPostgressqlRepository } from "../repositories/user-postgressql.repository";
import { UserController } from "../controllers/user.controller";
import ITokenRepository from "../interfaces/ITokenRepository";
import { TokenRepository } from "../repositories/token.repository";
import { VerificationTokenService } from "../services/verificationToken.service";
import IVerificationTokenService from "../interfaces/IVerificationToken";
import INodemailerService from "../interfaces/INodemailerService";
import { NodemailerService } from "../services/nodemailer.service";

const container = new Container();

const userRepository: IUserRepository = new UserPostgressqlRepository();

container
.bind<IUserRepository>(TOKENS.IUserRepository)
.toConstantValue(userRepository);

container.bind<IUserService>(TOKENS.IUserService).to(UserService);
container.bind<UserController>(TOKENS.UserController).to(UserController);

const tokenRepository: ITokenRepository = new TokenRepository();
container
  .bind<ITokenRepository>(TOKENS.IVerificationTokenRepository)
  .toConstantValue(tokenRepository);
container
  .bind<IVerificationTokenService>(TOKENS.IVerificationTokenService)
  .to(VerificationTokenService);

container
  .bind<INodemailerService>(TOKENS.INodemailerService)
  .to(NodemailerService);

export { container };
