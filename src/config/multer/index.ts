import { Request } from "express";
import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error, destination: string) => void,
  ) => {
    callback(
      null,
      path.join(__dirname, "../../../../public/images"),
    );
  },
  filename: (
    req: Request,
    _file: Express.Multer.File,
    callback: (error: Error, destination: string) => void,
  ) => {
    callback(null, req.body.name);
  },
});

const audioStorage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error, destination: string) => void,
  ) => {
    callback(
      null,
      path.join(__dirname, "../../../../public/audios"),
    );
  },
  filename: (
    req: Request,
    _file: Express.Multer.File,
    callback: (error: Error, destination: string) => void,
  ) => {
    callback(null, req.body.name);
  },
});

const videoStorage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error, destination: string) => void,
  ) => {
    callback(
      null,
      path.join(__dirname, "../../../../public/videos"),
    );
  },
  filename: (
    req: Request,
    _file: Express.Multer.File,
    callback: (error: Error, destination: string) => void,
  ) => {
    callback(null, req.body.name);
  },
});

export const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10000000 },
  fileFilter: function fileFilter(_req, file, cb) {
    if (
      file.mimetype.substring(0, "image".length) === "image"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
export const uploadAudio = multer({
  storage: audioStorage,
  fileFilter: function fileFilter(_req, file, cb) {
    if (
      file.mimetype.substring(0, "audio".length) === "audio"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
export const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: function fileFilter(_req, file, cb) {
    if (
      file.mimetype.substring(0, "video".length) === "video"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
