import express from "express";
const router = express.Router();


import posts from "./posts";
import messages from "./messages";
import conversations from "./conversations";

router.use("./posts", posts);
router.use("./conversations", conversations);
router.use("./messages", messages);

export default router;
