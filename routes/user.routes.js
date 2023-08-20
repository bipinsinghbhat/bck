const express=require("express")
const {userModel}=require("../models/user.model")
const bcrpyt=require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
        try {
            bcrpyt.hash(pass,5,async(err,hash)=>{
                if(err){
                    res.json({error:err.message})
                }
                else{
                    const usersdetails=new userModel({name,email,pass:hash})
                    await usersdetails.save()
                }
            })
            res.json({msg:"User has been registered",usersdetails:req.body})
        } catch (error) {
            res.json({error:err.message})
        }     
})


userRouter.post("/login",async(req,res)=>{
const {email,pass}=req.body
try {
    const usersdetails=await userModel.findOne({email})
 if(usersdetails){
    bcrpyt.compare(pass,usersdetails.pass,(err,result)=>{
        if(result){
     let token=jwt.sign({userID:usersdetails._id,user:usersdetails.name},"masai")       
     //course:random payload ...  masai :key
            res.json({msg:"Logged In",token})
        }
        else{
            res.json({err:"wrong credentails"})
        }
    })
 }
 else{
    res.json({msg:"User does not exist"})
 }
}
 catch (error) {
    res.json({err:"something went wrong"})
}
})

























module.exports={
    userRouter
}



//UserDetails ===name of collection


//userID===random payload ,,,id pass krree taki ,,notes me id lesake ,,,relationship building