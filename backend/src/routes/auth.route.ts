

import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();

router.route("/signup").post(registerUser)

router.route("/login").post(loginUser)



export default router



