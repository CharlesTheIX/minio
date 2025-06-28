import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config({ path: "./.env" });

export type MinioVariables = {
  port: number;
  useSSL: boolean;
  endpoint: string;
  accessKey: string;
  secretKey: string;
};
export const getMinioVariables = (): MinioVariables => {
  const variables: MinioVariables = {
    endpoint: process.env.MINIO_ENDPOINT || "",
    port: Number(process.env.MINIO_PORT) || 9000,
    accessKey: process.env.MINIO_ACCESS_KEY || "",
    secretKey: process.env.MINIO_SECRET_KEY || "",
    useSSL: process.env.useSSl === "true" || false,
  };
  return variables;
};