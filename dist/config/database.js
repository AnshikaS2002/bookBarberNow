"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        await mongoose_1.default.connect(mongoUri);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
};
exports.default = connectDatabase;
