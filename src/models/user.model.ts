import mongoose from "mongoose";
import bcrypt from "bcrypt"
import config from "config"


export interface userDocument extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(canditatePassword:string):Promise<boolean>
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    let user = this as userDocument
    if (!user.isModified("password")) {
        return next()
    }
    const salt = await bcrypt.genSalt(config.get<number>("roundSalt"))

    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()
})

userSchema.methods.comparePassword = async function (canditatePassword:string):Promise<boolean>{
    const user = this as userDocument;
return bcrypt.compare(canditatePassword,user.password).catch((e)=>e.false)
}

 const User = mongoose.model("User", userSchema)

 export default User