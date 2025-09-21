const mongoose = require('mongoose');
const ConnectionSchema =new mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    status:{
        type:String,
        enum:{
            values:['ignored','accepted','interested','rejected'],
            message:'{VALUE} is incorrect'
    },
    required:true
}

},{timestamps:true})
//This code is a Mongoose pre-save hook.
//It runs before a ConnectionRequest document is saved to the database.
//you can do this in API level also
ConnectionSchema.index({ fromuserId: 1, touserId: 1 }, { unique: true }); // Ensure unique connection requests between users
ConnectionSchema.pre('save',async function(next){
    const connectionreq=this;
    if (connectionreq.fromuserId.equals(connectionreq.touserId.toString())){
        throw new Error("You cannot connect with yourself");
    }
    next();
})
const ConnectionRequest = new mongoose.model('ConnectionRequest',ConnectionSchema);
module.exports = ConnectionRequest;