import { extname } from "path";
import { v4 as uuid } from "uuid";
import { GraphQLUpload } from "graphql-upload";
import s3 from "./s3";

type File = {
  createReadStream: any;
  filename: string;
  mimetype: string;
  encoding: string;
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: async (_: any, { file }: { file: File }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const { Location } = await s3
        // @ts-ignore
        .upload({
          Body: createReadStream(),
          Key: `${uuid()}${extname(filename)}`,
          ContentType: mimetype,
        })
        .promise();

      return {
        filename,
        mimetype,
        encoding,
        uri: Location,
      };
    },
  },
};
