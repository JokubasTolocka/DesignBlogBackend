import { GraphQLUpload } from "graphql-upload";
import getImageUrls from "./getImageUrls";

type File = {
  createReadStream: any;
  filename: string;
  mimetype: string;
  encoding: string;
};

export default {
  Upload: GraphQLUpload,
  Query: {
    designImages: async (
      parent: any,
      args: any,
      { models: { designModel } }: { models: { designModel: any } }
    ) => {
      const designImages = await designModel.find().exec();
      return designImages;
    },
    photographyImages: async (
      parent: any,
      args: any,
      { models: { photographyModel } }: { models: { photographyModel: any } }
    ) => {
      const photographyImages = await photographyModel.find().exec();
      return photographyImages;
    },
  },
  Mutation: {
    photoUpload: async (
      _: any,
      {
        normalFile,
        compressedFile,
        description,
      }: { normalFile: File; compressedFile: File; description: string | null },
      { models: { photographyModel } }: { models: { photographyModel: any } }
    ) => {
      const [LocationNormal, LocationCompressed] = await getImageUrls(
        normalFile,
        compressedFile
      );

      const photographyImage = await photographyModel.create({
        normalUrl: LocationNormal,
        compressedUrl: LocationCompressed,
        description,
      });

      return {
        normalUrl: photographyImage.normalUrl,
        compressedUrl: photographyImage.compressedUrl,
        description,
      };
    },
    designUpload: async (
      _: any,
      {
        normalFile,
        compressedFile,
        description,
      }: { normalFile: File; compressedFile: File; description: string | null },
      { models: { designModel } }: { models: { designModel: any } }
    ) => {
      const [LocationNormal, LocationCompressed] = await getImageUrls(
        normalFile,
        compressedFile
      );

      const designImage = await designModel.create({
        normalUrl: LocationNormal,
        compressedUrl: LocationCompressed,
        description,
      });

      return {
        normalUrl: designImage.normalUrl,
        compressedUrl: designImage.compressedUrl,
        description,
      };
    },
  },
};
