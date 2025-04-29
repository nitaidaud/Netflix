import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { injectable } from "inversify";
import path from "path";
import { configAWS } from "../config/config";
import { S3_BUCKET } from "../env_exports";
import IAwsService from "../interfaces/IAwsService";

@injectable()
export class AwsService implements IAwsService {
  private s3 = configAWS();

  private directoryPath = "C:/netflix_movie";

  private getContentTypeByExtension = (extension: string): string => {
    switch (extension) {
      case ".m3u8":
        return "application/vnd.apple.mpegurl";
      case ".ts":
        return "video/MP2T";
      default:
        return "application/octet-stream";
    }
  };

  async uploadToS3(filePath: string, fileContent: Buffer<ArrayBufferLike>) {
    const key = `Madagascar/${path.basename(filePath)}`;

    const params: PutObjectRequest = {
      Bucket: S3_BUCKET!,
      Key: key,
      Body: fileContent,
      // ACL: "public-read",
      ContentType: this.getContentTypeByExtension(path.extname(filePath)),
    };

    return await this.s3.upload(params).promise();
  }

  async deleteFromS3(key: string): Promise<void> {
    const params = {
      Bucket: S3_BUCKET!,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }

  async listS3Files(prefix: string): Promise<AWS.S3.ObjectList> {
    const params = {
      Bucket: S3_BUCKET!,
      Prefix: prefix,
    };

    const result = await this.s3.listObjectsV2(params).promise();
    return result.Contents || [];
  }

  // fs.readdir(directoryPath, (err: Error | null, files: string[]) => {
  //   if (err) console.log(err);

  //   const uploadPromises = files.map((file) =>
  //     uploadToS3(path.join(directoryPath, file)),
  //   );

  //   Promise.all(uploadPromises)
  //     .then(() => console.log("All files uploaded"))
  //     .catch(console.error);
  // });
}
