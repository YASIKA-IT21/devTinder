const express = require('express');
const database=require('./config/database.js');
const user = require('./models/user.js')
const userAuth=require('./middleware/Auth.js')
const app = express();
const cookie=require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{uservalidation}=require('./utils/validate.js');
app.use(express.json());
app.use(cookie())
app.post('/user',async(req,res)=>{
    try{

        uservalidation(req);
        const {firstName,lastName,email,password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);

        const newuser = new user({
            firstName,lastName,email,password:passwordHash
        })
        await newuser.save();
        console.log(newuser);
        res.status(201).json({message:"User created successfully",user:newuser});
    }catch(err){
        res.status(500).json({message:"Check the user credentials",error:err.message});
    }
})
app.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    try{
        const presentuser = await user.findOne({email:email})
        if(!presentuser){
            return res.status(400).json({message:"User not found"});
        }
        const passwordcompare = await bcrypt.compare(password,presentuser.password);
        if(!passwordcompare){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = await presentuser.getJWT();
        console.log(token)
        res.cookie("token",token);
        res.status(200).json({message:"Login successful"});
    }catch(err){
        res.status(500).json({message:"Internal server error",error:err.message});
    }
})
app.get('/profile',userAuth,async(req,res)=>{
    try{
        
    const presentuser = req.user;
    res.status(200).json({message:"User profile fetched successfully",user:presentuser});
    }catch(err){
        res.status(500).json({message:"Internal server error",error:err.message});
    }
    
})
//FEED API=to get all users from the database
app.get('/sendconnection',userAuth,async(req,res)=>{
    res.send("connection made");
})
app.delete('/delete',async(req,res)=>{
    const userid = req.body.userid;
    try{
        const deleteduser = await user.findByIdAndDelete(userid);
        res.status(200).json({message:"User deleted successfully",user:deleteduser});
    }catch(err){
        res.json({message:"Internal server error",error:err.message});
    }
})
app.patch('/update/:userId',async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    const ALLOWED_UPDATES=['userId','about','photoUrl','age','skills'];
    const isupdateAllowed =Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    if(!isupdateAllowed){
        return res.status(400).json({message:"Invalid updates"});
    }
    if(data?.skills.length>5){
        throw new Error("Skills cannot be more than 5");
    }
    try{
        const updateduser =await user.findByIdAndUpdate({_id:userId},data,{
            returnDocument:'after',
            runValidators:true
        });
        console.log (updateduser);
        res.status(200).json({message:"User updated successfully",user:user});
    }catch(err){
        res.status(500).json({message:"Internal server error",error:err.message});
    }
})
const PORT = process.env.PORT || 3000;
database().then(()=>
    {console.log("Database connected");app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});}).catch((err)=>console.log(err));


