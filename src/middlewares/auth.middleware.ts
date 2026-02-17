import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface JwtPayload {
    userId : string;
}

export const authMiddleware = async (
    req : Request,
    res : Response,
    next : NextFunction
) =>{
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                messsage : "No token provided",
            })
        }

        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                message : "Invalid token format",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {userId : string};

        const user = await User.findById(decoded.userId);

        if(!user) {
            return res.status(401).json({
                message : "user no longer exists",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message : "Invalid or expired token",
        })
    }
}