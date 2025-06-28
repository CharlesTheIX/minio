import * as gbl from "../../../globals";
import { BucketItem, Client } from "minio";
import getBucketExists from "../buckets/getBucketExists";

type Props = {
  client: Client
  prefix?: string;
  bucketName: string;
  recursive?: boolean;
  startAfter?: string;
};

export default async (props: Props): Promise<ApiResponse> => {
  const { client, bucketName, prefix = "", recursive = false, startAfter = "" } = props;

  try {
    const exists = await getBucketExists({ client, bucketName });
    if (!exists) {
      return { ...gbl.response_BAD, message: `Bucket does not exists: ${bucketName}.` }
    }

    var data: BucketItem[] = [];
    await new Promise<void>((resolve, reject) => {
      const stream = client.listObjectsV2(bucketName, prefix, recursive, startAfter);

      stream.on("data", (obj: BucketItem) => {
        data.push(obj);
      });

      stream.on("error", (err) => {
        reject(err);
      });

      stream.on("end", () => {
        resolve();
      });
    });

    if (data.length === 0) return gbl.response_NO_CONTENT;
    return { ...gbl.response_OK, data };
  } catch (err: any) {
    console.error("Failed to list bucket objects: ", err);
    return { ...gbl.response_BAD, message: `Failed to list bucket objects - ${err.message}.` }
  }
}