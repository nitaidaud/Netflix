import { Container } from "inversify";
import IProfileRepository from "../Interfaces/IProfileRepository";
import { ProfileRepository } from "../repositories/profile.repository";
import TOKENS from "../../tokens";
import IProfileService from "../Interfaces/IProfileService";
import { ProfileService } from "../services/profile.service";
import { ProfileController } from "../controllers/profile.controller";

const container = new Container();

const profileRepository: IProfileRepository = new ProfileRepository();

container
  .bind<IProfileRepository>(TOKENS.IProfileRepository)
  .toConstantValue(profileRepository);

container.bind<IProfileService>(TOKENS.IProfileService).to(ProfileService);
container.bind(TOKENS.ProfileController).to(ProfileController);

export { container };
