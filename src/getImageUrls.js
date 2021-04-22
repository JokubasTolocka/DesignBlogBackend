import getLocationUrl from "./getLocation";

const getImageUrls = async (normalFile, compressedFile) => {
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
