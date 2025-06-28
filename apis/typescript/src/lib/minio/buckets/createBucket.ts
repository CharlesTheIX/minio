import { Client } from "minio";
import * as gbl from "../../../globals";
import getBucketExists from "./getBucketExists";

type Props = {
  client: Client,
  bucketName: string,
};

export default async (props: Props): Promise<ApiResponse> => {
  const { client, bucketName } = props;

  try {
    const exists = await getBucketExists({ client, bucketName });
    if (exists) {
      return { ...gbl.response_CONFLICT, message: `Bucket already exists: ${bucketName}.` }
    }

    await client.makeBucket(bucketName, "");
    return gbl.response_DB_UPDATED;
  } catch (err: any) {
    if (err.name === "BucketAlreadyOwnedByYou") {
      return { ...gbl.response_CONFLICT, message: `Bucket already exists: ${bucketName}.` }
    }

    console.error("Failed to create bucket:", err);
    return { ...gbl.response_BAD, message: `Failed to create bucket ${bucketName} - ${err.message}.` }
  }
}