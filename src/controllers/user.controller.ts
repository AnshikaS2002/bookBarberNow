import {Request, Response} from "express";
import User from "../models/user.model";

export const signupUser = async (req : Request, res : Response) => {
    try{
        const {name, email, password} = req.body;

        const user = await User.create({
            name,
            email,
            password,
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