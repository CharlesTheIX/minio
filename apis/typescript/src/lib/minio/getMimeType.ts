import { mimeTypesRecord } from "./mimeTypes";

export default (objectName: string): string | false => {
  const extMatch = objectName.toLowerCase().match(/\.([a-z0-9]+)$/);
  if (!extMatch) return false;

  const ext = extMatch[1];
  return mimeTypesRecord[ext] || false;
}