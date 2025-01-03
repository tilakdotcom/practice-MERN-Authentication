

import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller";
import verifyUser from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyUser ,logoutUser)



export default router



