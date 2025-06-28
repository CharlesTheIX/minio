import { Client } from "minio";
import * as gbl from "../../../globals";
import getBucketExists from "../buckets/getBucketExists";

type Props = {
  client: Client,
  bucketName: string;
  objectName: string;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { client, bucketName, objectName } = props;

  try {
    const exists = await getBucketExists({ client, bucketName });
    if (!exists) {
      return {
        ...gbl.response_BAD,
        message: `Bucket does not exist: ${bucketName}.`,
      };
    }

    const stream = await client.getObject(bucketName, objectName);
    return { ...gbl.response_OK, data: stream };
  } catch (err: any) {
    console.error("Failed to get object:", err);
    return { ...gbl.response_BAD, message: `Failed to get object: ${err.message}` };
  }
};