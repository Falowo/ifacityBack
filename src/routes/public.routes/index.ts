import express from "express";
const router = express.Router();


import currentUser from "./currentUser";
import upload from "./upload";


router.use("/currentUser", currentUser);
router.use("/upload", upload);


export default router;
