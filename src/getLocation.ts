import { v4 as uuid } from "uuid";
import { extname } from "path";
import s3 from "./s3";

export default async function getLocationUrl(
  filename: string,
  mimetype: string,
  createReadStream: any
) {
  const { Location } = await s3
    // @ts-ignore
    .upload({
      Body: createReadStream(),
      Key: `${uuid()}${extname(filename)}`,
      ContentType: mimetype,
    })
    .promise();

  return Location;
}
