import jwt from "jsonwebtoken";
import { SECRET } from "../env.js";

const privateKey = SECRET;

function createToken(payload){
    const token = jwt.sign(payload,privateKey);
    return token;
}

function verifyToken(token){
    const payload = jwt.verify(token,privateKey);
    return payload;
}

export {createToken,verifyToken}

