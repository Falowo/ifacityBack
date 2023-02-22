import express from "express";
const router = express.Router();
import { signin } from "../../controllers/authControllers/signin.controller";

//signUp

//signIn
router.post("/signin", signin);


// logout

export default router;
