const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:30
    },

    lastName:{
        type:String,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
        
    }, 

    password:{
        type:String,
        required:true
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
        default:"https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_incoming&w=740&q=80"

    },
    about:{
        type:String,
        default:"This is a default value"
    },


},{
    timestamps:true,
})
const user = new mongoose.model('user',userSchema);
module.exports=user;