import mimeTypes from "./mimeTypes";

export default (file: Express.Multer.File): boolean => {
  const mimeType = file.mimetype;
  if (!mimeType) return false;
  return mimeTypes.includes(mimeType);
};