import express from "express";
const router = express.Router();
import {uploadAudio, uploadImage, uploadVideo} from "../../config/multer"
import { single } from "../../controllers/upload.controller";
router.get("/req", async (req, res) => {
  console.log(req);
  res.status(200).json(req);
});

//singleImage
router.post("/singleImage", uploadImage.single("file"), single);
//singleAudio
router.post("/singleAudio", uploadAudio.single("file"), single);
//singleVideo
router.post("/singleVideo", uploadVideo.single("file"), single);

router.post('/arrayImages', uploadImage.array('images', 12), )

export default router;