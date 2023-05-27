// import { NextRequest, NextResponse } from 'next/server';
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import {v4 as uuidV4} from 'uuid';
// import dotenv from 'dotenv';

// import multer, { MulterError } from 'multer';
// import multerS3 from 'multer-s3';

// dotenv.config();

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION
// });

// const storage = multer.memoryStorage();

// // const fileFilter = (req: NextRequest, file, cb) => { 
// //     const {mimetype} = file;
// //     if(mimetype === "text/csv" || mimetype === "application/json") {
// //         cb(null, true);
// //     } else {
// //         cb(new multer.MulterError( "LIMIT_UNEXPECTED_FILE" ));
// //     }
// // }

// const uploadOptions = {
//     storage,
//     fileFilter,
//     limits: {fileSize: 10 * 1024 * 1024 * 1024} //10 gigabytes max file 
// }

// const uploadOptions2 = {
//   storage: multerS3({
//     s3: s3Client,
//     bucket: process.env.AWS_UPLOAD_BUCKET,
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: (req, file, cb) => {
//       cb(null, `file-uploads/${uuidV4()}--${file.originalname}`);
//     }
//   }),
//   limits: {
//     fileSize: 10 * 1024 * 1024 * 1024} /** @info: 10 gigabytes max file */
//   },
//   fileFilter: function(req, file: File, cb: multer.FileFilterCallback): multer.FileFilterCallback {
//     if (file.mimetype === "text/csv" || file.mimetype === "application/json") {
//       cb(null, true);
//     } else {
//       cb(new multer.MulterError( "LIMIT_UNEXPECTED_FILE" ));
//     }
//   }
// };

// const upload = multer(uploadOptions2).array('files', 5); /** @info: limit to 5 files */

// const s3UploadFiles = async (files) => {
//     const params = files.map(file => ({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `file-uploads/${uuidV4()}--${file.originalname}`, //Better naming convention for filles ???
//         Body: file.buffer
//     }))

//     return await Promise.all(params.map(param => s3Client.send(new PutObjectCommand(param))))
// }

// export const config = {
//   api: {
//     bodyParser: false, // Disables automatic body parsing by Next.js
//   },
// };

// export async function POST() {
//   // const res = await fetch('https://data.mongodb-api.com/...', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     'API-Key': process.env.DATA_API_KEY,
//   //   },
//   //   body: JSON.stringify({ time: new Date().toISOString() }),
//   // });
 
//   // const data = await res.json();
 
//   // return NextResponse.json(data);
  
//     upload(req: NextRequest, res: NextResponse, (err) => {
      
//     })
// }

