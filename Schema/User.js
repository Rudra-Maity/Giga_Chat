const mongoose=require('mongoose');

const User=new mongoose.Schema({
    fullName:{
        fName:{type:String,required:true},
        lName:{type:String,required:true}
    },
    Email:{required:true, unique:true,type:String},
    chat_num:{required:true,unique:true,type:String},
    password:{required:true, type:String},
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'Friend'}],
    createdAt:{
        type:Date,
        default:Date.now
    },
    profileImg:{type: Buffer}
});

module.exports=mongoose.model('User',User);
