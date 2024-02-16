
const express = require('express');
const path=require('path')
const router = express.Router();

const MyRouter=(io)=>{


router.get('/', (req, res) => {

    res.status(200).sendFile(path.join(__dirname,'..','views','Html','Home.html'))


});

// const io = req.io
io.on('connect', (socket) => {
    console.log('A user connected in demo route');
    if (socket.recovered) {
        // recovery was successful: socket.id, socket.rooms and socket.data were restored
      } else {
        console.log(socket.recovered);
      

    socket.on('createMessage',(msg)=>{

        console.log(msg, socket.id);
        socket.emit('newMessage','From Server')
    })

    
    socket.emit('x','djiaksdj')
  
    socket.on('disconnect', () => {
        console.log('User disconnected in demo route');
    });
}
});

return router
}
module.exports = MyRouter;
