const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
},{
    versionKey:false
})

const userModel=mongoose.model("usersdetails",userSchema)

module.exports={
    userModel
}



//Usersdetails === name of collection
//UserSchema