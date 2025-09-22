import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { registrarUsuario, logarUsuario } from "../controllers/authController.js";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});
router.post("/register", registrarUsuario);
router.post("/login", logarUsuario); 

export default router;