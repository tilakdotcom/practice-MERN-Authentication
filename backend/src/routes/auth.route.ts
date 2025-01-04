

import { Router } from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, verifyEmail, verifyPasswordToken } from "../controllers/auth.controller";
import verifyUser from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(registerUser)

router.route("/login").post(loginUser)

router.route("/forgot-password").get(forgotPassword)
router.route("/verify-password-token/:token").patch(verifyPasswordToken)

router.route("/logout").get(verifyUser ,logoutUser)

router.route("/verify").get(verifyUser ,verifyEmail)






export default router



