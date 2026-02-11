"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signupUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const createdUser = await user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        //Fetch user again WITHOUT password(since select : false is there in password schema)
        const user = await user_model_1.default.findById(createdUser._id);
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
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const user = await user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.loginUser = loginUser;
