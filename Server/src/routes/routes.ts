import express from "express";

import { verifyToken } from "../middleware/verifyToken";
import { createUser } from "../apis/createUser";

const router = express.Router();

router.post("/create-user", verifyToken, createUser);

export default router;
