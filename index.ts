import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import typeDefs from "./src/typedefs";
import resolvers from "./src/resolvers";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";

dotenv.config();

const PORT = process.env.PORT || 8000;
const corsConfig = cors({ origin: `${process.env.CORS_ACCEPT_URL}` });

// const s3Uploader = new AWSS3Uploader({
//   accessKeyId: process.env.AWS_ACCESS_KEY || "",
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
//   destinationBucketName: "DesignPortfolio",
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
});

const app = express();
app.use(corsConfig);

// Apollo Playground get stuck on loading screen without this
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

app.use(graphqlUploadExpress());
server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log("App is running!");
  // mongoose.connect(process.env.DB_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   keepAlive: true,
  // });
});
