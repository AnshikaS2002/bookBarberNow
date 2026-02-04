"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = (req, res) => {
    res.send("BookBarberNow backend is running");
};
exports.healthCheck = healthCheck;
