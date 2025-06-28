import { Client } from "minio";
import * as gbl from "../../../globals";
import getObjectExists from "./getObjectExists";
import getBucketExists from "../buckets/getBucketExists";
import getIsValidObjectName from "../getIsValidObjectName";

type Props = {
  client: Client;
  bucketName: string;
  objectName?: string;
  fromSource?: string;
  file: Express.Multer.File;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { client, bucketName, objectName, file, fromSource = "unknown" } = props;
  const name = objectName || file.originalname;
  const metaData = {
    "Content-Type": file.mimetype,
    "X-Amz-Meta-Uploaded-From": fromSource,
  };

  const validObjectName = getIsValidObjectName(name);
  if (!validObjectName.error) {
    return { ...gbl.response_BAD, message: `${validObjectName.message}` };
  }

  try {
    const bucketExists = await getBucketExists({ client, bucketName });
    if (!bucketExists) {
      return { ...gbl.response_BAD, message: `Bucket does not exists: ${bucketName}.` } 
    }

    const objectExists = await getObjectExists({ client, bucketName, objectName: name });
    if (objectExists) {
      return { ...gbl.response_BAD, message: `Object already exists: ${name}.` }
    }

    const objectInfo = await client.fPutObject(bucketName, name, file.path, metaData);
    if (!objectInfo) return { ...gbl.response_BAD, message: "Filed to upload form object." };
    return gbl.response_DB_UPDATED;

  } catch (err: any) {
    console.error("Failed to upload form object: ", err);
    return { ...gbl.response_BAD, message: `Failed to upload form object - ${err.message}.` }
  }
}