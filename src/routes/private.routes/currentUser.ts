import express from "express";
const router = express.Router();
import { getOrCreate } from "../../controllers/currentUser.controller";

router.get("/req", async (req, res) => {
  console.log(req);
  res.status(200).json(req);
});

//signIn
router.post("./getOrCreate", getOrCreate);

// logout

export default router;
