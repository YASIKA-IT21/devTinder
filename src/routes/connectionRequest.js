const express=require('express');
const userAuth=require('../middleware/Auth.js')
const connectRequestRouter=express.Router();
const user=require('../models/user.js');
const connectionRequest=require('../models/connectionRequest.js');

connectRequestRouter.post('/request/send/:status/:touserId',userAuth,async(req,res)=>{
try{
    const fromuserId=req.user._id;
    const touserId=req.params.touserId;
    const status= req.params.status;
    const touser =await user.findById(touserId);
    
    if(!touser){
        throw new Error("You are trying to connect with a user that does not exist");
    }
    const allowedrequest =['interested','ignored']
    if(!allowedrequest.includes(status)){
    return res.status(400).json({message:"Invalid status"});
    }
    const existingRequest = await connectionRequest.findOne({
        $or:[
            {fromuserId,touserId},
            {fromuserId:touserId,touserId:fromuserId}]
    })
    if(existingRequest){
        return res.status(400).json({message:"Connection request already exists"});
    }
    const connection = new connectionRequest({
        fromuserId,
        touserId,
        status,
    });
    //if there is a existing request from the same user to the same user, update the status
    

    await connection.save();
    res.status(200).json({message:req.user.firstName+" "+status+" "+touser.firstName +" request ",data:connection
    })

}   catch(err){
    res.status(500).json({message:"error",error:err.message}); 
} 







})
//on the receiver side
//accept or reject the request
//only status can be changed to accepted or rejected
connectRequestRouter.post('/request/review/:status/:requestID',userAuth,async(req,res)=>{
    try{
        const status=req.params.status;
        const requestID=req.params.requestID;
        const loggeduser=req.user;
        const isAllowed =['accepted','rejected']
        if(!isAllowed.includes(status)){
            return res.status(400).send({message:"Invalid status"});
        }
        //have to check if the request exists and if the logged in user is the receiver of the request
        const connectRequest =await connectionRequest.findOne({
            _id:requestID,
            touserId:loggeduser._id,
            status:"interested"
        });
        if(!connectRequest){
            return res.status(404).send({message:"Request  not found"});
        }
        connectRequest.status=status;
        await connectRequest.save();
        res.status(200).send({message:"Request "+status, data:connectionRequest});
    }catch(err){
        res.status(400).send({message:err.message});
    }
})
module.exports=connectRequestRouter;