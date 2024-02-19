const  mongoose  = require('mongoose');
const express=require('express');
const router=express.Router()
const { validationResult } = require('express-validator');
const path = require('path');

const User=require('../Schema/User.js');
const conn=require('../Schema/conn.js')

const jwtDecryption=require('../AuthenticationAndProfile/jwtAndPasswordOperation.js').jwtDecryption
const jwtEncryption=require('../AuthenticationAndProfile/jwtAndPasswordOperation.js').jwtEncryption;
const Password=require('../AuthenticationAndProfile/jwtAndPasswordOperation.js');
const isAuthenticate=require('../AuthenticationAndProfile/isAuthenticate.js');


router.route('/authentication')
.get((req,res)=>{
    const htmlFile=path.join(__dirname,'..','views','Html')
    
    let authType=req.query.authType;
    authType=authType ||'xxx'.toLocaleLowerCase()
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    switch (authType){
        case 'signup':
            if(!jwtDecryption(req.cookies.sid)) res.sendFile(htmlFile+'/signup.html')
            else res.send('<script>window.location.replace("/")</script>')
            break;
        
        case 'signin':
            if(!jwtDecryption(req.cookies.sid)) res.sendFile(`${htmlFile}/signIn.html`)
            else res.send('<script>window.location.replace("/")</script>')
            break;
         
        case 'forgetpassword':

        if(!jwtDecryption(req.cookies.sid)) res.status(200).sendFile(`${htmlFile}/forgetPassword.html`)
        else res.send('<script>window.location.replace("/")</script>')
            break;
        case 'logout':
            
            res.clearCookie('sid');
            res.send('<script>window.location.replace("/authentication?authType=signin")</script>')
            break;

        default : res.status(404).send('<script>window.location.replace("404")</script>')
    }
})
.post(isAuthenticate,async(req,res,next)=>{
    try{
        const authType=req.query.authType.toLocaleLowerCase()

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const expTime=3600*24*30;
    switch(authType){

    case 'signin': 
    try{
        const {userId,pass}=req.body
            if(userId && pass){
    const userId=req.body.userId.toLocaleLowerCase();
    const password=req.body.pass;

            const userDetails=await User.findOne({
                $or:[{Email:userId},{chat_num:userId}]
                
            });
            
            if(userDetails){
                const isCorrectPass=await Password.compare(password,userDetails.password);
                
                if(isCorrectPass){
                    const payload = {
                        username: userDetails.chat_num,
                // other claims...
                exp: Math.floor(Date.now() / 1000) + expTime, // Set expiration time
            };
            
            const token = jwtEncryption(payload)
            
            res.cookie('sid', token, {
                httpOnly: true,
                maxAge: expTime * 1000, // Convert seconds to milliseconds
                secure:true,
                sameSite:'Strict'
            });
            
            return res.status(200).json({succees:true})
        }
        else {
            res.status(200).json({passErr:'password does not matched'})
        }
    }
   else return res.status(200).json({userIdErr:'userId does not matched'})

}
else   {
    res.send('<script>window.location.replace("/authentication?authType=signin")</script>')
}
}catch(e){
    console.log(e);
   return res.send('some err')
}
break;

    case 'signup':
        
        // const pass=await Password.hashing(req.body.pass)
        // console.log('pass',pass);
        try{
            const {fName,lName,Email,pass}=req.body
            if(fName &&lName && Email && pass){
            const NewUser=await User.create({
                Email:req.body.Email.toLocaleLowerCase(),
                fullName:{
                    fName:req.body.fName,
                    lName:req.body.lName
                },
                chat_num:`91${Date.now()}`,
                password:await Password.hashing(req.body.pass)
            })
            
            // console.log('chat ',NewUser.chat_num);
           const payload = {
            username: NewUser.chat_num,
    // other claims...
             exp: Math.floor(Date.now() / 1000) + expTime, // Set expiration time
             
            };

        const token = jwtEncryption(payload)
        // console.log('token',token);

            res.cookie('sid', token, {
            httpOnly: true,
            maxAge: expTime * 1000, // Convert seconds to milliseconds
            secure:true,
            sameSite:'Strict'
        });
        res.status(200).json({chat_id:NewUser.chat_num,succees:true})
    }
    else res.send('<script>window.location.replace("/authentication?authType=signup"')
        }catch(e){
            console.log(e);
            if (e.code === 11000 || e.code === 11001) {
                return res.status(200).json({succees:false,reason:'Email id already Exist'})
            }
           return res.status(404).json({err:e,succees:false})
        }
        break;

        case 'forgetpassword':
        const userid= req.body.userId.toLocaleLowerCase();
        const pass=req.body.pass;
        if(userid && pass){
        const pass=await Password.hashing(req.body.pass)
           const FindUser=await User.updateOne({
            $or:[{Email:userid},{chat_num:userid}]
           },{$set:{password:pass}})
           res.status(200).json({succees:true})
    }
    else res.status(200).json({
        requiredErr:'userId or password requierd'
    })
    }
    }catch(err){
        next(err)
    }finally{
    }
    
})

module.exports=router