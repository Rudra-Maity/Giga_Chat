const mongoose=require('mongoose');

const Friend=new mongoose.Schema({
    friend_id:{type:mongoose.Schema.Types.ObjectId, ref:'chat',required:true,unique:true},

    user_chat1:{
        name:{type: String,default:''},
        chat_num: { type: String, ref: 'User' },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    user_chat2:{
        name:{type: String,default:''},
        chat_num: { type: String, ref: 'User' },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }

})

module.exports=mongoose.model('Friend',Friend)