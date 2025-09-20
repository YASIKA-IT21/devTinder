const express=require('express');
const userAuth=require('../middleware/Auth.js')
const profileRouter = express.Router();
const {validateEditProfile}=require('../utils/validate.js');
profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
        
    const presentuser = req.user;
    res.status(200).json({message:"User profile fetched successfully",user:presentuser});
    }catch(err){
        res.status(500).json({message:"Internal server error",error:err.message});
    }
    
})
profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
        if(!validateEditProfile(req)){
            return res.status(400).send("Invalid updates");
        };
        const loggeduser = req.user;
        Object.keys(req.body).forEach((field)=>(loggeduser[field]=req.body[field]));
        await loggeduser.save();
        res.json({
            message:`${loggeduser.firstName}Profile updated successfully`,
            data:loggeduser});


    }catch(err){
        res.status(400).send("Error occured"+err.message)
    }
})
profileRouter.patch("/profile/changepassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old and new password are required" });
    }

    const presentuser = req.user;

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, presentuser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash and update new password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    presentuser.password = passwordHash;

    await presentuser.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error changing password", error: err.message });
  }
});

module.exports=profileRouter;