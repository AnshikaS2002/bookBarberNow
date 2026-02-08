import {Request, Response} from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const signupUser = async (req : Request, res : Response) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(409).json({
                message : "User with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            name,
            email,
            password : hashedPassword,
        })

        //Fetch user again WITHOUT password(since select : false is there in password schema)
        const user = await User.findById(createdUser._id);

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