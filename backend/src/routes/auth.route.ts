

import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const router = Router();

router.route("/signup").get(registerUser)



export default router



