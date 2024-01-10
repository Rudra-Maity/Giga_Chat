const mogoose=require('mongoose');


const conn = mogoose.connect(process.env.connUri?process.env.connUri:'mongodb://127.0.0.1:27017/My_chat')
.then((Db)=>{
    console.log('succeeed');
   module.exports=Db
})
.catch((err)=>{
    console.log(err);
})


