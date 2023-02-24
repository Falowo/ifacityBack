import express from "express";
const router = express.Router();
import { signin } from "../../controllers/authControllers/signin.controller";

router.get("/req", async (req, res) => {
    console.log(req);
    res.status(200).json(req);
  });

//signIn
router.post("/signin", signin);


// logout

export default router;
