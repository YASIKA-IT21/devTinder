const validator = require('validator');
const uservalidation=(req)=>{
    const{firstName,lastName,email,password}=req.body;
    if(!firstName||!lastName){
        throw new Error("First name and last name are required");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is not a valid  valid");
    }
    if(!validator.isStrongPassword(password)){

    }
}
module.exports={
    uservalidation
}