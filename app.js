import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { graphqlUploadExpress } from "graphql-upload";
import mongoose from "mongoose";
import typeDefs from "./src/typedefs";
import resolvers from "./src/resolvers";
import designModel from "./models/designImage";
import photographyModel from "./models/photographyImage";

dotenv.config();

const PORT = process.env.PORT || 8000;
const corsConfig = cors({ origin: `${process.env.CORS_ACCEPT_URL}` });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: {
    models: {
      designModel,
      photographyModel,
    },
  },
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
  mongoose.connect(encodeURI(process.env.DB_URL || "") || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
  });
});
