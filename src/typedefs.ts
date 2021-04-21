import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type Image {
    id: ID!
    normalUrl: String!
    compressedUrl: String!
    description: String
  }

  type Query {
    designImages: [Image!]!
    photographyImages: [Image!]!
  }

  type Mutation {
    photoUpload(
      normalFile: Upload!
      compressedFile: Upload!
      description: String
    ): Image
    designUpload(
      normalFile: Upload!
      compressedFile: Upload!
      description: String
    ): Image
  }
`;
