import express from "express";
const router = express.Router();
import { getOrCreate } from "../../controllers/currentUser.controller";



//signIn
router.post("/getOrCreate", getOrCreate);

// logout

export default router;
