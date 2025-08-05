import { Schema,model } from "mongoose";
import {createHmac,randomBytes} from "node:crypto"
import { createToken } from "../services/athantification.js";


const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})


userSchema.pre("save",function(next){
    const user  = this;

    const salt = randomBytes(16).toString();
    const hashedpassword = createHmac("sha256",salt).update(user.password).digest("hex");
    
    this.salt = salt;
    this.password = hashedpassword;

    next();
})

userSchema.static("machpassword",async function machpassword(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User Not Registerd");

    const salt = user.salt;
    const hashedpassword = user.password;

    const hashprovidedpassword = createHmac("sha256",salt).update(password).digest("hex");

    if(hashedpassword !== hashprovidedpassword) throw new Error("Incorrect Password");

    const payload = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    }

    const token = createToken(payload);
    
    return token
})

const UserModle = model("users",userSchema)

export default UserModle;