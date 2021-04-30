import { GraphQLUpload } from "graphql-upload";
import getImageUrls from "./getImageUrls";

export default {
  Upload: GraphQLUpload,
  Query: {
    designImages: async (parent, args, { models: { designModel } }) => {
      const designImages = await designModel
        .find()
        .sort({ datefield: -1 })
        .exec();
      return designImages;
    },
    photographyImages: async (
      parent,
      args,
      { models: { photographyModel } }
    ) => {
      const photographyImages = await photographyModel
        .find()
        .sort({ datefield: -1 })
        .exec();
      return photographyImages;
    },
  },
  Mutation: {
    photoUpload: async (
      _,
      { normalFile, compressedFile, description },
      { models: { photographyModel } }
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
      _,
      { normalFile, compressedFile, description },
      { models: { designModel } }
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
