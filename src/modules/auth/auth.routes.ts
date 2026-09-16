import { Router } from "express";
import { authController } from "./auth.controllers";
import auth from "../../middlewdare/auth";
const router = Router();

router.post("/signup", authController.createUser);
router.post("/signin", authController.login);


export const authRouter = router;

