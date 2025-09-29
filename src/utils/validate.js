const validator = require('validator');
const uservalidation=(req)=>{
    const{firstName,lastName,email,password,about}=req.body;
    if(!firstName||!lastName){
        throw new Error("First name and last name are required");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is not a valid  valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");

    }
   
}
const validateEditProfile=(req)=>{
    const AllowedUpdates=['firstName','lastName','email','age','photoUrl','about','skills','gender'];
    const isAllowed =Object.keys(req.body).every((field)=>AllowedUpdates.includes(field));
   return isAllowed;
}
module.exports={
    uservalidation,
    validateEditProfile

}