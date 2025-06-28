import { Client } from "minio";
import * as gbl from "../../../globals";
import getBucketExists from "../buckets/getBucketExists";

type Props = {
  client: Client,
  expires?: number;
  bucketName: string;
  objectName: string;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { client, bucketName, objectName, expires = 24 * 60 * 60 } = props;

  try {
    const exists = await getBucketExists({ client, bucketName });
    if (!exists) {
      return {
        ...gbl.response_BAD,
        message: `Bucket does not exist: ${bucketName}.`,
      };
    }

    const presignedUrl = await client.presignedGetObject(bucketName, objectName, expires);
    return { ...gbl.response_OK, data: presignedUrl };
  } catch (err: any) {
    console.error("Failed to get object url:", err);
    return { ...gbl.response_BAD, message: `Failed to get object url: ${err.message}` };
  }
};