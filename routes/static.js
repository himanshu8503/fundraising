import { Router } from "express";
import fundModel from "../model/fund.js";
import { log } from "console";


const Static = Router();

Static.get("/",async(req,res) => {
    try{
        if(req.user){
            const fundbyuser = await fundModel.findOne({createdby:req.user.id});
            const highestfund = await fundModel.find().sort({fundNum:-1}).populate("createdby");
            
            return res.render("home",{
                user:req.user,
                fundbyuser,
                highestfund
            });
        }
        else{
            return res.render("home");
        }
    }catch(err)
    {
        
    }

})

Static.get("/signup",(req,res) => {
    return res.render("signup");
})

Static.get("/signin",(req,res) => {
    return res.render("signin");
})

Static.get("/logout",(req,res) => {
    return res.clearCookie("token").redirect("/");
})
export default Static;