const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:30
    },

    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },

    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value){
        if(!validator.isEmail)
        {
            throw new Error("Email is not valid");  
        }
    }
    // validate(value) {
    //     if (!value.endsWith('@gmail.com')) {
    //         throw new Error("Email must be a gmail.com address");
    //     }
    // }
},

    password: {
    type: String,
    required: true,
    minLength: 8,
    
    
},

    age:{
        type:Number,
        min:18
        
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        
        validate(value){
        if(!validator.isURL(value))
        {
            throw new Error("Photo URL is not valid");  
        }
    },  
        default:"https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_incoming&w=740&q=80"

    },
    about:{
        type:String,
        default:"This is a default value"
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length>5){
                throw new Error("Skills cannot be more than 5");
            }
        }
    }


},{
    timestamps:true,
})
userSchema.methods.getJWT=function(){
    const user =this;
    const token = jwt.sign({_id:user._id},"yasika12230",{expiresIn:"1h"});
    return token;
}
const user = new mongoose.model('user',userSchema);
module.exports=user;