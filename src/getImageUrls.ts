import getLocationUrl from "./getLocation";

type File = {
  createReadStream: any;
  filename: string;
  mimetype: string;
  encoding: string;
};

const getImageUrls = async (normalFile: File, compressedFile: File) => {
  const {
    createReadStream: createReadStreamNormal,
    filename: filenameNormal,
    mimetype: mimetypeNormal,
  } = await normalFile;

  const LocationNormal = await getLocationUrl(
    filenameNormal,
    mimetypeNormal,
    createReadStreamNormal
  );

  const {
    createReadStream: createReadStreamCompressed,
    filename: filenameCompressed,
    mimetype: mimetypeCompressed,
  } = await compressedFile;

  const LocationCompressed = await getLocationUrl(
    filenameCompressed,
    mimetypeCompressed,
    createReadStreamCompressed
  );

  return [LocationNormal, LocationCompressed];
};

export default getImageUrls;
