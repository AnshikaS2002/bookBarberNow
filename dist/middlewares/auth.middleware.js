"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                messsage: "No token provided",
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Invalid token format",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.default.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                message: "user no longer exists",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};
exports.authMiddleware = authMiddleware;
