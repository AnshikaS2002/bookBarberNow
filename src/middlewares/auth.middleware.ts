import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId : string;
}

export const authMiddleware = (
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
        ) as JwtPayload;

        req.user = {
            userId: decoded.userId,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message : "Invalid or expired token",
        })
    }
}