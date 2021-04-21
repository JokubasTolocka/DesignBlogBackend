import mongoose from "mongoose";

const photographyImageSchema = new mongoose.Schema(
  {
    normalUrl: {
      type: String,
      required: true,
    },
    compressedUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const PhotographyImage = mongoose.model(
  "PhotographyImage",
  photographyImageSchema
);
export default PhotographyImage;
