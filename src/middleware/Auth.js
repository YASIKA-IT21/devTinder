const jwt = require("jsonwebtoken");
const user = require("../models/user.js");
const userAuth=async(req,res,next)=>{
    try{

        const {token} = req.cookies;
    if(!token){
        return res.status(401).json({message:"Unauthorized No token"});
    }
    const decoded =await jwt.verify(token,"yasika12230");
    const{_id}=decoded;
    const decodeduser = await user.findById(_id)
    if(!decodeduser){
        return res.status(404).json({message:"User not found"});
    }
    req.user = decodeduser;
    next();
    }catch(err){
        res.status(500).json({message:"error",error:err.message});
    }
    
    
    
}
module.exports = userAuth;