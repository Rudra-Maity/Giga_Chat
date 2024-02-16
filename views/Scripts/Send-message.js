const input_text=document.getElementById('input-text');

function SentMessage(text_msg_input,file_msg){
 // if (file_msg && text_msg_input){
 //  return [msg_input.innerText , ]
  
 // }else if(text_msg_input){
 //  return text_msg_input.innerText 
 // }
 // console.log(input_text.value);
 socket.emit('createMessage', {
 from: 'Client',
 text: input_text.value,
 createdAt: new Date().getTime()
});

}
