

import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyEmail } from "../controllers/auth.controller";
import verifyUser from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(verifyUser ,logoutUser)

router.route("/verify").get(verifyUser ,verifyEmail)





export default router



