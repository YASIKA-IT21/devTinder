const mongoose = require('mongoose');
const db=async()=>{mongoose.connect('mongodb://localhost:27017/Mydb')};
module.exports=db;
