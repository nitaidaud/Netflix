export default interface IAwsService {
  uploadToS3(
    filePath: string,
    fileContent: Buffer<ArrayBufferLike>,
  ): Promise<AWS.S3.ManagedUpload.SendData>;
  deleteFromS3(key: string): Promise<void>;
  listS3Files(prefix: string): Promise<AWS.S3.ObjectList>;
}
