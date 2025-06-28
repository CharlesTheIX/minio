import { Client } from "minio";

type Props ={
  client: Client,
  bucketName: string;
}

export default async (props: Props): Promise<boolean> => {
  const { client, bucketName } = props;
  try {
    const exists = await client.bucketExists(bucketName);
    if (!exists) return false;
    return true;
  } catch (err: any) {
    return false;    
  }
}