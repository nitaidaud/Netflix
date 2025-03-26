import { Container } from "inversify";
import IUserService from "../interfaces/IUserService";
import { UserService } from "../services/user.service";
import { TOKENS } from "../../tokens";
import IUserRepository from "../interfaces/IUserRepository";
import { UserPostgressqlRepository } from "../repositories/user-postgressql.repository";
import { UserController } from "../controllers/user.controller";

const container = new Container();

const userRepository: IUserRepository = new UserPostgressqlRepository();

container
  .bind<IUserRepository>(TOKENS.IUserRepository)
  .toConstantValue(userRepository);

container.bind<IUserService>(TOKENS.IUserService).to(UserService);
container.bind<UserController>(TOKENS.UserController).to(UserController);

export { container };
