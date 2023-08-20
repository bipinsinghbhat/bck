const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes")
const app=express()
const cors=require("cors")

app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(4500,async()=>{
      try {
        await connection
        console.log("connected to the Db")
      } catch (error) {
        console.log(error)
        console.log("something went wrong")
      }
      console.log("server is running at port 4500")
})





