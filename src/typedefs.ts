import { gql } from "apollo-server-express";

export default gql`
  type File {
    uri: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  scalar Upload

  type Image {
    id: ID!
    normalUrl: String!
    compressedUrl: String!
  }

  type Query {
    designImages: [Image!]!
    photographyImages: [Image!]!
  }

  type Mutation {
    photoUpload(normalFile: Upload!, compressedFile: Upload!): File
    designUpload(normalFile: Upload!, compressedFile: Upload!): File
  }
`;
