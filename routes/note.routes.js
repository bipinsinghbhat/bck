const express=require("express")

const noteRouter=express.Router()
const {noteModel}=require("../models/note.model")
const {auth}=require("../middlewares/auth.middleware")

noteRouter.use(auth)



noteRouter.post("/create",async(req,res)=>{
   try {
    const notesdetails=new noteModel(req.body)
    await notesdetails.save()
    res.json({msg:"New note has been added",notesdetails:req.body})
   } catch (error) {
    res.json({error:error.message})
   }
}) 












noteRouter.get("/",async(req,res)=>{
    try {
        const notesdetails=await noteModel.find({userID:req.body.userID})
        res.send(notesdetails) 
    } catch (error) {
      res.json({error:"somethig went wrong"})  
    }
})















noteRouter.patch("/update/:noteID",async(req,res)=>{
 //userID in the user doc====userID in the note doc

const userIDinUserDoc=req.body.userID
const {noteID}=req.params
try {
const notesdetails=await noteModel.findOne({_id:noteID})
const userIDinNoteDoc=notesdetails.userID

    if(userIDinUserDoc===userIDinNoteDoc){
await noteModel.findByIdAndUpdate({_id:noteID},req.body)
res.json({msg:`${notesdetails.title}has been updated`})
    }else{
        console.log("user",userIDinUserDoc,"note",userIDinNoteDoc)
        res.json({msg:"Not Authorized"})
    }
} catch (error) {
res.json({error:"error",err})
}
})



































noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID}=req.params
try {
  const notesdetails=new noteModel.findOne({_id:noteID}) 
 const userIDinNoteDoc=notesdetails.userID
     if(userIDinNoteDoc===userIDinUserDoc){
        await noteModel.findByIdAndDelete({_id:noteID})
          res.json({msg:`${notesdetails.title} has been deleted`}) 
    
    }
    else{
           res.json({msg:"Not Authorized!!"})
    }
} catch (error) {
    res.json({error:error.message})
}
})























module.exports={
    noteRouter
}




//restriced routes ,,so middleware