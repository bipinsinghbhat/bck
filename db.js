const mongoose=require("mongoose")
const connection=mongoose.connect("mongodb://localhost:27017/full_stack_database")

module.exports={
    connection
}