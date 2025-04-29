import AWS from "aws-sdk";
import fs from "fs";
import { config } from "../config/config";

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

const s3 = new AWS.S3();

export async function uploadToS3(
  filePath: string,
  destinationKey: string,
): Promise<string> {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: config.aws.s3Bucket!,
    Key: destinationKey,
    Body: fileContent,
    ACL: "public-read",
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
}

export async function deleteFromS3(key: string): Promise<void> {
  const params = {
    Bucket: config.aws.s3Bucket!,
    Key: key,
  };

  await s3.deleteObject(params).promise();
}

export async function listS3Files(prefix: string): Promise<AWS.S3.ObjectList> {
  const params = {
    Bucket: config.aws.s3Bucket!,
    Prefix: prefix,
  };

  const result = await s3.listObjectsV2(params).promise();
  return result.Contents || [];
}
