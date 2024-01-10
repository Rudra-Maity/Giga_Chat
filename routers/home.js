
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send(`<h1>Hello from the demo route!</h1>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        // After the script is loaded, connect to the server and handle the events
        const str=window.location.protocol+'//'+window.location.hostname+':'+window.location.port
        const socket = io(str); 
       

        socket.on('connect', () => {
            console.log('Connected to the server');

            socket.on('newMessage', (message) => {
                console.log('Received new message from the server:', message);
            });

            socket.emit('createMessage', {
                from: 'Client',
                text: 'Hello from the client!',
                createdAt: new Date().getTime()
            });
        });
    </script>
    `);
    
    // Access io using req.io
    const io = req.io
    
    io.on('connect', (socket) => {
        console.log('A user connected in demo route');
        if (socket.recovered) {
            // recovery was successful: socket.id, socket.rooms and socket.data were restored
          } else {
            console.log(socket.recovered);
          

        socket.on('createMessage',(msg)=>{

            console.log(msg, socket.id);
        })

        socket.emit('newMessage','From Server')

        socket.on('disconnect', () => {
            console.log('User disconnected in demo route');
        });
    }
    });
});



module.exports = router;
