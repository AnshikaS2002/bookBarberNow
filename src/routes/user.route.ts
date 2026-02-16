import { Router } from "express";
import {signupUser, loginUser} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) =>{
    return res.status(200).json({
        message : "Access granted to protected route",
        userId : req.user?.userId,
    });
})

export default router;