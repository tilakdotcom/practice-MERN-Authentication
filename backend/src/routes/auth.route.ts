

import { Router } from "express";
import { forgotPassword, loginUser, logoutUser, refreshAccessToken, registerUser, verifyEmail, verifyPasswordToken } from "../controllers/auth.controller";
import verifyUser from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(registerUser)

router.route("/login").post(loginUser)

router.route("/forgot-password").get(forgotPassword)
router.route("/verify-password-token/:token").patch(verifyPasswordToken)

router.route("/logout").get(verifyUser ,logoutUser)

router.route("/verify/:code").get(verifyUser ,verifyEmail)

router.route("/refresh-access-token").get(verifyUser,refreshAccessToken)






export default router



