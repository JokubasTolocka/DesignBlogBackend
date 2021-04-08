import dotenv from "dotenv";
import AWS from "aws-sdk";

dotenv.config();

type Config = {
  s3: AWS.S3.ClientConfiguration;
  app: {
    storageDir: string;
  };
};

const config: Config = {
  s3: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
    region: process.env.AWS_S3_REGION,
    params: {
      ACL: "public-read",
      Bucket: process.env.AWS_S3_BUCKET,
    },
  },
  app: {
    storageDir: "tmp",
  },
};

export default config;
