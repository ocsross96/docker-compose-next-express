
import express, {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { s3UploadFiles } from '../aws-services/s3Client.js';//.js Extension even though imported from a .ts file -- to do with ES modules
import multer, { MulterError } from 'multer';
import { upload } from '../middleware/multerMiddleware.js';
dotenv.config();

const app:Express = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.post('/upload', upload.array("files"), async (request: Request, response: Response, next ) => {
  const files =  request.files as Express.Multer.File[];
  try {
    if(!files || !files.length) throw(new Error("No file selected."))
    const results = await s3UploadFiles(files)
    response.status(200).json({message: 'Files uploaded successfully', results});
  } catch (error) {
    next(error)
  }
})

app.use((error: Error | MulterError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof MulterError || error instanceof Error) {
    return res.status(400).send({ message: error.message });
}
//Error handling for AWS-SDK errors ??
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
