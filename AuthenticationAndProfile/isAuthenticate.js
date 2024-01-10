const jwtVerification=require('./jwtAndPasswordOperation').jwtDecryption;

const isAuthenticate=function(req,res,next){
    const sid=req.cookies.sid;
    console.log(sid);
   
        const JwtUser=jwtVerification(sid);
        if(JwtUser) {
            return res.send('<script>window.location.replace("*")</script>')
        }
        next();
    }


module.exports=isAuthenticate