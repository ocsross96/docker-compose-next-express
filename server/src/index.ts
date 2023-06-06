import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MulterError } from 'multer';

import { s3UploadFiles } from '../aws-services/s3Client.js'; //.js Extension even though imported from a .ts file -- to do with ES modules
import { upload } from '../middleware/multerMiddleware.js';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.post(
  '/upload',
  upload.array('files'),
  async (request: Request, response: Response, next) => {
    const files = request.files as Express.Multer.File[];
    try {
      if (!files || !files.length) throw new Error('No file selected.');
      const results = await s3UploadFiles(files);
      response
        .status(200)
        .json({ message: 'Files uploaded successfully', results });
    } catch (error) {
      next(error);
    }
  }
);

app.get('/chat', async (req: Request, res: Response, next) => {
  const questionQueryParam = req.query.q;

  try {
    if (typeof questionQueryParam !== 'string') {
      throw new Error('Question is not a string');
    }

    const question = encodeURIComponent(questionQueryParam);
    const response = await fetch(
      `${process.env.QUERY_API_BASE_URL}?q=${question}`
    );

    if (response.ok) {
      const data = await response.text();
      res.status(200).json({ data });
    } else {
      console.log(response);
      throw new Error('Oops, something went wrong, please try again.');
    }
  } catch (error) {
    next(error);
  }
});

app.use((error: Error | MulterError, req: Request, res: Response) => {
  if (error instanceof MulterError || error instanceof Error) {
    return res.status(400).send({ message: error.message });
  }
  //Error handling for AWS-SDK errors ??
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
