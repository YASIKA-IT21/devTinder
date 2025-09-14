const express = require('express');
const database=require('./config/database.js');
const user = require('./models/user.js')
const app = express();
app.use(express.json());
app.post('/user',async(req,res)=>{
    try{
        const obj = req.body;
        const newuser = new user(obj)
        await newuser.save();
        console.log(newuser);
        res.status(201).json({message:"User created successfully",user:newuser});
    }catch(err){
        res.status(500).json({message:"Internal server error",error:err.message});
    }
})
//FEED API=to get all users from the database
app.get('/feed',async(req,res)=>{
    const email = req.body.email;
      
    try{
      
        const  users=   await user.findOne({email:email});
        res.send(users);
        

    }
    catch(err){
        res.status(400).json({message:"Error fetching users"});
    }
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
const PORT = process.env.PORT || 3000;
database().then(()=>
    {console.log("Database connected");app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});}).catch((err)=>console.log(err));


