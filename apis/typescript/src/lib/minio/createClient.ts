import { Client } from "minio";
import { getMinioVariables } from "../getVariables"


export default (): Client => {
  const minioVariables = getMinioVariables();
  return new Client({
    port: minioVariables.port,
    useSSL: minioVariables.useSSL,
    endPoint: minioVariables.endpoint,
    accessKey: minioVariables.accessKey,
    secretKey: minioVariables.secretKey
  });
}
