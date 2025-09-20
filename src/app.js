const express = require('express');
const database=require('./config/database.js');
const app = express();
const authRouter=require('./routes/Auth.js');
const profileRouter=require('./routes/profile.js');
const connectRequestRouter=require('./routes/connectionRequest.js');
const cookie=require('cookie-parser');
app.use(express.json());
app.use(cookie())
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',connectRequestRouter)



const PORT = process.env.PORT || 3000;
database().then(()=>
    {console.log("Database connected");
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});}).catch((err)=>console.log(err));


