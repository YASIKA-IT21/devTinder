const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use("/abi", (req,res)=>{
    res.send("Hello World");
})
app.get("/abi", (req,res)=>{
    res.send("Hello World test 1");
})
app.use("/test", (req,res)=>{
    res.send("Hello World test");
})
// //app.use("/test", (req,res)=>{
//     res.send("Hello World");
// })
// app.use("/", (req,res)=>{
//     res.send("Hello World");
// })
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});