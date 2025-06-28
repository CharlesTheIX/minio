import { Client } from "minio"
import * as gbl from "../../../globals";
import getBucketExists from "./getBucketExists";

type Props = {
  client: Client;
  bucketName: string;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { client, bucketName} = props;

  try {
    const exists = await getBucketExists({ client, bucketName });
    if (!exists) {
      return { ...gbl.response_BAD, message: `Bucket does not exists: ${bucketName}.` }
    }

    await client.removeBucket(bucketName);
    return gbl.response_DB_UPDATED;
  } catch (err: any) {
    console.error("Failed to remove bucket: ", err);
    return { ...gbl.response_BAD, message: `Failed to remove bucket ${bucketName} - ${err.message}.` }
  }
}