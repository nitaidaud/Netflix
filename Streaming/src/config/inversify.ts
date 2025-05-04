import { Container } from "inversify";
import TOKENS from "../TOKENS";
import { StreamerService } from "../services/streamer.service";
import { StreamerController } from "../controllers/streamer.controller";
import IStreamerService from "../interfaces/IStreamerService";
import IAwsService from "../interfaces/IAwsService";
import { AwsService } from "../services/aws.service";

const container = new Container();

container.bind<IStreamerService>(TOKENS.IStreamerService).to(StreamerService);

container
  .bind<StreamerController>(TOKENS.StreamerController)
  .to(StreamerController);

container.bind<IAwsService>(TOKENS.IAwsService).to(AwsService);

export { container };
