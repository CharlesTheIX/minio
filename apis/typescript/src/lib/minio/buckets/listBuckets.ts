import { Client } from "minio";
import * as gbl from "../../../globals"

type Props = {
  client: Client
};

export default async (props: Props): Promise<ApiResponse> => {
  const { client } = props;

  try {
    const result = await client.listBuckets();
    if (!result || result.length === 0) return gbl.response_NO_CONTENT;
    return { ...gbl.response_OK, data: result }
  } catch (err: any) {
    console.error("Failed to list buckets: ", err);
    return { ...gbl.response_BAD, message: `Failed to list buckets - ${err.message}.` }
  }
}