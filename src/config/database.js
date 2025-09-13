const mongoose = require('mongoose');
const db=async()=>{mongoose.connect('mongodb+srv://admin:Yasika@cluster0.ymubvh5.mongodb.net/MYdb')};
module.exports=db;
