import { Router } from "express";
import UserModle from "../model/user.js";
import fundModel from "../model/fund.js";

const User = Router();

User.post("/signup",async (req,res) => {
    const {fullname,email,password} = req.body;
    await UserModle.create({
        fullname:fullname,
        email:email,
        password:password
    });
    return res.redirect("/signin");
})

User.post("/signin",async (req,res) => {
    const {email,password} = req.body;
    const token = await UserModle.machpassword(email,password);
    return res.cookie("token",token).redirect("/")
})

User.post("/fund",async(req,res) => {
    const fund = Number(req.body.fund);
    await fundModel.create({
        fundNum:fund,
        createdby:req.user.id
    })
    return res.redirect("/");
})

export default User;