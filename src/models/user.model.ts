import mongoose, {Document} from "mongoose";

export interface IUser {
    name : string;
    email : string;
    password : string;
}

const userSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required : true,
        },
        email :{
            type : String,
            required : true,
            unique : true,
        },
        password :{
            type : String,
            required : true,
            select : false
        },
    }, 
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser & Document>("User", userSchema);

export default User;