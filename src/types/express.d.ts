import {Types} from "mongoose";
import {Document} from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: IUser & Document;
        };
    }
}

export {};