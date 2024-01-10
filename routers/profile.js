const router=require('express').Router();


const User=require('../Schema/User.js');
const Friends=require('../Schema/Friends.js')
const jwtDecryption=require('../AuthenticationAndProfile/jwtAndPasswordOperation.js').jwtDecryption


router.route('/profile')
.get(async(req,res,next)=>{
   const UserId= jwtDecryption(req.cookies.sid)

   if(UserId) {
    try{
    const chat_num=UserId.username
    const UserDetails=await User.findOne({chat_num:chat_num},{Email:1,chat_num:1,fullName:1,_id:0});

    res.status(200).json(UserDetails)
    }catch(e){
        res.status(304).json({succees:false})
    }
   }
   else res.status(200).send('<script>window.location.replace("/authentication?authType=signin")</script>')
})
.post(async(req,res,next)=>{
    const userId=jwtDecryption(req.cookies.sid);
    if(userId){
        // console.log(userId);
   const UserDetail= await User.updateOne({
      chat_num:userId.username
    },{$set:{
        Email:req.body.Email.toLocaleLowerCase(),
        'fullName':{
        fName:req.body.fName,
        lName:req.body.lName
    }
    }})
    // console.log(UserDetail);

    res.status(200).send('succeed')
    }

    else res.status(404).send('<script>window.location.replace("/authentication?authType=signin")</script>')

});

router.get('/profile/contacts',async(req,res,next)=>{
    const user_chat_num=jwtDecryption(req.cookies.sid).chat_num;
    if(user_chat_num){
    const specificContact=req.query.contact;
    if(specificContact){
      const contactDetails=  await Friends.find({
        $or:[{'user_chat1.chat_num': specificContact,'user_chat2.chat_num': user_chat_num},

        {'user_chat2.chat_num': specificContact,'user_chat1.chat_num': user_chat_num}]
        
    });

    if(contactDetails)return res.status(200).json({contactDetails,succees:true,auth:true})
    else return res.status(200).json({succees:false})

    }

    else{
        const contactListDetails=  await Friends.find({
            $or:[{'user_chat2.chat_num':user_chat_num},
    
            {'user_chat1.chat_num': user_chat_num}]
        });

        return res.status(200).json({contactListDetails,succees:true,auth:true})
    }

    }

   return res.status(200).json({succees:false,auth:false});
})


module.exports=router;