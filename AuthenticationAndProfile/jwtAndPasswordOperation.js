const Jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const jwtEncryption=(payload)=>{
  // console.log(process.env.jwtKey);
  return  Jwt.sign(payload, process.env.jwtKey);
    
}

const jwtDecryption=(token)=>{
    try{
    const user=Jwt.verify(token,process.env.jwtKey);
    return user;
    }catch(err){
        return false
    }

}

const hashing=async(password)=>{
    let hashPass=undefined;
    // console.log('password: ',password);
    const saltRounds=14
   hashPass=await bcrypt.hash(password, saltRounds);
  //  console.log('hasspass ',hashPass);
      return hashPass
}

const compare=async(loginPasswordAttempt,hashedPasswordFromDatabase)=>{
    let isCorrect;
   isCorrect=await bcrypt.compare(loginPasswordAttempt, hashedPasswordFromDatabase);

      return isCorrect;
}

module.exports={jwtEncryption,jwtDecryption,hashing,compare}