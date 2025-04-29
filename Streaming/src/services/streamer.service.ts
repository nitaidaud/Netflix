import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { inject, injectable } from "inversify";
import path from "path";
import { Readable } from "stream";
import TOKENS from "../TOKENS";
import { configAWS } from "../config/config";
import { TEMP_DIR } from "../env_exports";
import IAwsService from "../interfaces/IAwsService";
import IStreamerService from "../interfaces/IStreamerService";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@injectable()
export class StreamerService implements IStreamerService {
  private s3 = configAWS();

  constructor(@inject(TOKENS.IAwsService) private awsService: IAwsService) {}

  private bufferToStream = (buffer: Buffer): Readable => {
    const readable = new Readable();

    readable._read = () => {};

    readable.push(buffer);
    readable.push(null);

    return readable;
  };

  private streamToBuffer = (readable: Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readable.on("data", (chunk) => chunks.push(chunk));
      readable.on("end", () => resolve(Buffer.concat(chunks)));
      readable.on("error", reject);
    });
  };

  processVideo = async (movieName: string): Promise<void> => {
    try {
      //Stream the movie from s3

      // const s3Stream = s3
      //   .getObject({ Bucket: bucketName, Key: movieName })
      //   .createReadStream();

      // const videoBuffer = await streamToBuffer(s3Stream);
      // const video = bufferToStream(videoBuffer);

      const videoPath = "C:/netflix_movie/Madagascar.mp4";

      const outputDir = "C:/netflix_movie/output";

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .addOptions([
            "-profile:v baseline",
            "-level 3.0",
            "-start_number 0",
            "-hls_time 10",
            "-hls_list_size 0",
            "-f hls",
          ])
          .output(path.join(outputDir, `${movieName}.m3u8`))
          .on("end", async () => {
            console.log("HLS conversion completed");

            try {
              const files = fs.readdirSync(outputDir);

              for (const file of files) {
                const filePath = path.join(outputDir, file);
                const fileContent = fs.readFileSync(filePath);

                await this.awsService.uploadToS3(filePath, fileContent);
              }
              resolve(null);
            } catch (error) {
              console.error(error);
              reject(error);
            }
          })
          .on("error", (err) => {
            console.error(`HLS conversion error: ${err}`);
            reject(err);
          })
          .on("stderr", (err) => {
            console.error(`HLS conversion stderr: ${err}`);
          })
          .run();
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
