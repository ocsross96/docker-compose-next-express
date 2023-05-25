import multer, {FileFilterCallback} from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => { 
    const {mimetype} = file;
    if(mimetype === "text/csv" || mimetype === "application/json") {
        cb(null, true);
    } else {
        cb(new multer.MulterError( "LIMIT_UNEXPECTED_FILE" ));
    }
}

const params = {
    storage,
    fileFilter,
    limits: {fileSize: 10 * 1024 * 1024 * 1024} //10 gigabytes max file 
}

export const upload = multer(params)