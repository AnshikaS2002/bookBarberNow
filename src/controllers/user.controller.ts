import {Request, Response} from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const signupUser = async (req : Request, res : Response) => {
    try{
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
        })

        return res.status(201).json({
            message : "User created successfully",
            user,
        });
        
    } catch(error) {
        return res.status(500).json({
            message : "Something went wrong",
        })
    }
};