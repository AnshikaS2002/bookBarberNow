"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await user_model_1.default.create({
            name,
            email,
            password,
        });
        return res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
exports.signupUser = signupUser;
