import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {v4 as uuidV4} from 'uuid';
import dotenv from 'dotenv';

dotenv.config();
const s3Client = new S3Client({});

export const s3UploadFiles = async (files: Express.Multer.File[]) => {
    const params = files.map(file => ({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `file-uploads/${uuidV4()}--${file.originalname}`, //Better naming convention for filles ???
        Body: file.buffer
    }))

    return await Promise.all(params.map(param => s3Client.send(new PutObjectCommand(param))))
}