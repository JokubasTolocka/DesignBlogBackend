import AWS from "aws-sdk";
import { IUploader, UploadedFileResponse } from "./uploader";

type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};

export class AWSS3Uploader implements IUploader {
  private s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(config: S3UploadConfig) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || "ca-central-1",
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  // @ts-ignore
  async singleFileUploadResolver(
    parent: any,
    { file }: { file: Promise<File> }
  ): Promise<UploadedFileResponse> {
    // Todo next!

    //@ts-ignore
    return null;
  }
}
