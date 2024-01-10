const mongoose=require('mongoose');

const chat=new mongoose.Schema({
    chat_num1Id:String,
    chat_num2Id:String,
    chat:[
        {
            file:{
                path:{type:String, default:''},
                filename:String
            },
            txt:{
                content:String,
                send_num:{type:String}
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
            
        }
    ]
})

module.exports=mongoose.model('chat',chat);