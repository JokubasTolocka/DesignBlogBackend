import { gql } from "apollo-server-express";

export default gql`
  type File {
    uri: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  scalar Upload

  type Query {
    uploads: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File
  }
`;
