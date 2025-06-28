type MinioBucketData = {
  name: string,
  creationDate: Date
};

type MinioObjectData = {
  name: string;
  etag: string;
  size: number;
  lastModified: Date;
};