
const express = require('express');
const path = require('path')
const router = express.Router();

const jwtAndPasswordOperation = require('../AuthenticationAndProfile/jwtAndPasswordOperation')

// let jwttoken;
const MyRouter = (io) => {


    router.get('/', (req, res) => {
        // jwttoken=req.cookies.sid
        res.status(200).sendFile(path.join(__dirname, '..', 'views', 'Html', 'Home.html'))


    });

    // const io = req.io
    io.on('connect', (socket) => {
        
        // console.log(parsedCookies.sid);
        if (socket.recovered) {
            // recovery was successful: socket.id, socket.rooms and socket.data were restored
        } else {
            const cookies = socket.handshake.headers.cookie;
            const parsedCookies = cookies.split(';').reduce((cookiesObj, cookie) => {
                const [name, value] = cookie.trim().split('=');
                cookiesObj[name] = value;
                return cookiesObj;
            }, {}); 
            console.log(socket.recovered);
            console.log('Handshake : ', jwtAndPasswordOperation.jwtDecryption(parsedCookies.sid));

            socket.on('createMessage', (msg) => {

                console.log(msg, socket.id);
                socket.emit('newMessage', 'From Server')
            })


            socket.emit('x', 'djiaksdj')

            socket.on('disconnect', () => {
                console.log('User disconnected in demo route');
            });
        }
    });

    return router
}
module.exports = MyRouter;
