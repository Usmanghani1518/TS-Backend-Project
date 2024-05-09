import {Document} from "mongoose";
import User,{userDocument} from "../models/user.model"

export async function createUser (input:Document<Omit<userDocument,"createdAt"| "updatedAt" | "comparePassword">>){
try {
   return await User.create(input)
} catch (error:any) {
    throw new Error(error)
}
}


