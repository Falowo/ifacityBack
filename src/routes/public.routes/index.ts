import express from "express";
const router = express.Router();


import currentUser from "./currentUser";


router.use("./currentUser", currentUser);


export default router;
