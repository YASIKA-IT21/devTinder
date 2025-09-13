const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
    },

    lastName:{
        type:String,
    },

    email:{
        type:String,
        
    },

    password:{
        type:String,
        
    },

    age:{
        type:Number,
        
    },
    gender:{
        type:String,
    }

})
const user = new mongoose.model('user',userSchema);
module.exports=user;