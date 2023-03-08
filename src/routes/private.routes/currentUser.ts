import express from "express";
const router = express.Router();
import { getOrCreate } from "../../controllers/currentUser.controller";



//login with auth0 user
router.post("/getOrCreate", getOrCreate);

// logout

export default router;
