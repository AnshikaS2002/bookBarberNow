"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/signup", user_controller_1.signupUser);
router.post("/login", user_controller_1.loginUser);
router.get("/profile", auth_middleware_1.authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Access granted to protected route",
        userId: req.user?.userId,
    });
});
router.get("/me", auth_middleware_1.authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Current user fetched successfully",
        user: req.user,
    });
});
exports.default = router;
