const express = require('express');
const database=require('./config/database.js');
const app = express();
const PORT = process.env.PORT || 3000;
database().then(()=>
    {console.log("Database connected");app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});}).catch((err)=>console.log(err));


