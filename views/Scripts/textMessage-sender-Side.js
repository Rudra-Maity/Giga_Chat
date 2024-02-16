
// const sent_btn=document.getElementById('sent-svg');

const socket=io('/')
socket.on('connect', () => {
    console.log('Connected to the server');

    socket.on('newMessage', (message) => {
        console.log('Received new message from the server:', message);
    });

    
   
    socket.on('x',(msg)=>{
        console.log(msg);
    })
});