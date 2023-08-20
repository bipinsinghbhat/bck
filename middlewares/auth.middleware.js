// const jwt=require("jsonwebtoken")

// const auth=(req,res,next)=>{
//     const token=req.headers.authorization?.split(" ")[1]
//     if(token){
//        try {
//         const decoded=jwt.verify(token,"masai")
//         if(decoded){
//             console.log(decoded)
//             req.body.userID=decoded.userID
//              req.body.user=decoded.user
//             next()
//         }
//         else{
//           res.json({msg:"not Authorized"})
//         }
//        } catch (error) {
//         res.json({error:error.message})
//        } 
//     }
//     else{
//        res.json({msg:"please login" }) 
//     }
// }



const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
     const token=req.headers.authorization?.split(" ")[1]
         if(token){
            try {
                 const decoded=jwt.verify(token,"masai")
                 if(decoded){
                       req.body.userID=decoded.userID
                       req.body.user=decoded.user
                    next()
                 }
                 else{
                     req.json({mag:"not authorized"})
                 }
            } catch (error) {
                  res.json({error:error.message})
            }
         }

         else{
            res.json({msg:"please login"})
         }
}























module.exports={
    auth
}