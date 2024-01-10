const router = require('express').Router();

const User=require('../Schema/User.js');
const Friend=require('../Schema/Friends.js');
const createFriendshipAndChatRoom=require('../Schema/createFriendshipAndChatRoom.js');
const jwtDecryption=require('../AuthenticationAndProfile/jwtAndPasswordOperation.js').jwtDecryption;

router.get('/search',async(req,res,next)=>{
    const search_number=req.query.number;

    const FindUser=await User.fin
});

router.post('/room/:search_chat_num',async(req,res,next)=>{
    const search_chat_num=req.params.search_chat_num
    
    if(search_chat_num){
        const user_chat_num=jwtDecryption(req.cookies.sid).chat_num;
        if(user_chat_num){
       const room=await createFriendshipAndChatRoom(user_chat_num,search_chat_num);

      return res.status(200).json({succees:true,search_chat_num:search_chat_num})
        }

        return res.status(200).send('<script>window.location.replace("/authentication?authType=signin")</script>')
        
    }

    return res.status(200).json({succees:false})
});

router.put('/room/friend/update/:chat_num',async(req,res,next)=>{
    const Friend_chat_num=req.params.chat_num;
    
    const user_chat_num=jwtDecryption(req.cookies.sid).chat_num;

    if(user_chat_num){
        if(Friend_chat_num){
            await Friend.findOneAndUpdate({})
        }
    }
});