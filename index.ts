import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { AWSS3Uploader } from "./amazonUploading/s3";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

const corsConfig = cors({ origin: `${process.env.CORS_ACCEPT_URL}` });

app.use(corsConfig);
app.use(helmet());

const s3Uploader = new AWSS3Uploader({
  accessKeyId: process.env.AWS_ACCESS_KEY || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  destinationBucketName: "my-really-cool-bucket",
});

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String!
    }
    type UploadedFileResponse {
      filename: String!
      mimetype: String!
      encoding: String!
      url: String!
    }
    type Mutation {
      singleUpload(file: Upload!): UploadedFileResponse!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Hey!",
    },
    Mutation: {
      singleUpload: s3Uploader.singleFileUploadResolver.bind(s3Uploader),
    },
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log("App is running!");
  // mongoose.connect(process.env.DB_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   keepAlive: true,
  // });
});
