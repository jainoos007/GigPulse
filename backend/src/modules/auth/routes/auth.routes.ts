import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { validateMiddleware } from "../../../middleware/validate.middleware";
import { authMiddleware } from "../../../middleware/auth.middleware";
import { registerValidator } from "../validators/register.validator";
import { loginValidator } from "../validators/login.validator";

const router = Router();

router.post("/register", validateMiddleware(registerValidator), AuthController.register);
router.post("/login", validateMiddleware(loginValidator), AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.get("/me", authMiddleware, AuthController.me);

export default router;
