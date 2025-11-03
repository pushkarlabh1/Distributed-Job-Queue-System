import express from "express";
import { createUser, getUserByUid } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.get("/me", getUserByUid);

export default router;
