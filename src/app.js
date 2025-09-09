const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use("/admin", (req,res,next)=>{
    const token = "xyz";
    const authorized = token === "xyz"; // Example check
    if (authorized) {
        //res.status(200).send("Admin Authorized");
        console.log("Admin Authorized");
        next();
    } else {
        res.status(403).send("Forbidden");
    }
})
app.get("/admin/delete_admin", (req,res)=>{
    res.send("Hello World test 1");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});