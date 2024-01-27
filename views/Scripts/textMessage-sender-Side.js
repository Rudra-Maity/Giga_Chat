const socket=io('/')
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
    
    socket.on('x',(msg)=>{
        console.log(msg);
    })
});