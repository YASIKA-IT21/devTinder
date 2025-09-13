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
const PORT = process.env.PORT || 3000;
database().then(()=>
    {console.log("Database connected");app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});}).catch((err)=>console.log(err));


