const express = require('express');
const database=require('./config/database.js');
const app = express();
const cors = require('cors');
const authRouter=require('./routes/Auth.js');
const profileRouter=require('./routes/profile.js');
const connectRequestRouter=require('./routes/connectionRequest.js');
const userRouter=require('./routes/userRoute.js');
const cookie=require('cookie-parser');
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(cookie())
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',connectRequestRouter)
app.use('/',userRouter);



const PORT = process.env.PORT || 3000;
database().then(()=>
    {console.log("Database connected");
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});}).catch((err)=>console.log(err));


