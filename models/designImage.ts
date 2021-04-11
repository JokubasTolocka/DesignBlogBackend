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
  },
  {
    timestamps: true,
  }
);

const DesignImage = mongoose.model("DesignImage", designImageSchema);
export default DesignImage;
