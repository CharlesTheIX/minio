import fs from "fs"
import multer from "multer";
import * as gbl from "../globals";
import express, { Router, Request, Response } from "express";

import getMimeType from "../lib/minio/getMimeType";
import createClient from "../lib/minio/createClient";
import getObject from "../lib/minio/objects/getObject";
import listObjects from "../lib/minio/objects/listObjects";
import listBuckets from "../lib/minio/buckets/listBuckets";
import createBucket from "../lib/minio/buckets/createBucket";
import removeBucket from "../lib/minio/buckets/removeBucket";
import getObjectUrl from "../lib/minio/objects/getObjectUrl";
import getIsValidMimeType from "../lib/minio/getIsValidMimeType";
import getIsValidBucketName from "../lib/minio/getIsValidBucketName";
import uploadFormObject from "../lib/minio/objects/uploadFormObject";
import getIsValidObjectName from "../lib/minio/getIsValidObjectName";

const client = createClient();
const router: Router = express.Router();
const upload = multer({ dest: '/tmp' });

router.route("/buckets/create").put(async (request: Request, response: Response): Promise<any> => {
  const { bucketName } = request.body;
  if (!bucketName) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: bucketName." });
  }

  const validBucketName = getIsValidBucketName(bucketName);
  if (!validBucketName.error) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `${validBucketName.message}` })
  }

  try {
    const res = await createBucket({ client, bucketName });
    return response.json(res);
  } catch (err: any) {
    console.error(`Minio create bucket error: ${err.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

router.route("/buckets/list").post(async (_, response: Response): Promise<any> => {
  try {
    const res = await listBuckets({ client });
    return response.json(res);
  } catch (err: any) {
    console.error(`Minio list buckets error: ${err.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

router.route("/buckets/remove").delete(async (request: Request, response: Response): Promise<any> => {
  const { bucketName } = request.body;
  if (!bucketName) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: bucketName." });
  }

  const validBucketName = getIsValidBucketName(bucketName);
  if (!validBucketName.error) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `${validBucketName.message}` })
  }

  try {
    const res = await removeBucket({ client, bucketName });
    return response.json(res);
  } catch (err: any) {
    console.error(`Minio remove bucket error: ${err.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

router.route("/objects/form-upload").put(upload.single('file'), async (request: Request, response: Response): Promise<any> => { 
  const { bucketName, objectName, fromSource } = request.body;
  const file = request.file;
  if (!bucketName || !file) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: bucketName, file." });
  }

  const validBucketName = getIsValidBucketName(bucketName);
  if (!validBucketName.error) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `${validBucketName.message}` })
  }

  const validMimeType = getIsValidMimeType(file);
  if (!validMimeType) {
    fs.unlinkSync(file.path);
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Invalid file mimetype." })
  }

  try {
    const res = await uploadFormObject({ client, bucketName, objectName, file, fromSource})
    fs.unlinkSync(file.path);
    return response.json(res);
  } catch (err: any) {
    console.error(`Minio upload form object error: ${err.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

router.route("/objects/get").post(async (request: Request, response: Response): Promise<any> => {
  const { bucketName, objectName } = request.body;
  if (!bucketName || !objectName) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: bucketName, objectName." });
  }

  const validBucketName = getIsValidBucketName(bucketName);
  if (!validBucketName.error) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `${validBucketName.message}` })
  }

  const validObjectName = getIsValidObjectName(objectName);
  if (!validObjectName.error) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `${validObjectName.message}` })
  }
  
  const contentType = getMimeType(objectName);
  if (!contentType) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `Invalid object mimetype.` })
  }

  try {
    const res = await getObject({ client, bucketName, objectName });
    if (res.error) {
      return response.json(res);
    }

    response.setHeader("Content-Type", contentType);
    response.setHeader("Content-Disposition", `attachment; filename="${objectName}"`);
    res.data.pipe(response);
  } catch (err: any) {
    console.error(`Minio list bucket objects error: ${err.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

router.route("/objects/get-url").post(async (request: Request, response: Response): Promise<any> => {
  const { bucketName, objectName, expires } = request.body;
  if (!bucketName || !objectName) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: bucketName, objectName." });
  }

  const validBucketName = getIsValidBucketName(bucketName);
  if (!validBucketName.error) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `${validBucketName.message}` })
  }

  const validObjectName = getIsValidObjectName(objectName);
  if (!validObjectName.error) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `${validObjectName.message}` })
  }

  try {
    const res = await getObjectUrl({ client, bucketName, objectName, expires });
    return response.json(res);
  } catch (err: any) {
    console.error(`Minio list bucket objects error: ${err.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

router.route("/objects/list").post(async (request: Request, response: Response): Promise<any> => {
  const { bucketName, prefix, recursive, startAfter } = request.body;
  if (!bucketName) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: "Required inputs: bucketName." });
  }

  const validBucketName = getIsValidBucketName(bucketName);
  if (!validBucketName.error) {
    return response.status(gbl.status.BAD).json({ ...gbl.response_BAD, message: `${validBucketName.message}` })
  }

  try {
    const res = await listObjects({ client, bucketName, prefix, recursive, startAfter });
    return response.json(res);
  } catch (err: any) {
    console.error(`Minio list bucket objects error: ${err.message}`);
    return response.status(gbl.status.SERVER_ERROR).json(gbl.response_SERVER_ERROR);
  }
});

export default router;