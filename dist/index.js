"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Create a server
const app = (0, express_1.default)();
//Midleware to parse JSON
app.use(express_1.default.json());
// Test route
app.get("/", (req, res) => {
    res.send("BookBarberNow backend is running");
});
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
