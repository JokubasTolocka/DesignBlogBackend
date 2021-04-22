import mongoose from "mongoose";

const designImageSchema = new mongoose.Schema(
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

const DesignImage = mongoose.model("DesignImage", designImageSchema);
export default DesignImage;
