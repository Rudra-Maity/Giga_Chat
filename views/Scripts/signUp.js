
const signUp=document.getElementById('signUp');
const input=document.querySelectorAll('.inp');
const btn=document.getElementById('btn');
const chat_num=document.getElementById('chat_num');
const modal=document.getElementById('modal');
const modalBox=document.getElementById('chat_num');

function HomeBtn(){
  window.location.replace('/')
}

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    var i=0
if(input[0].value===''){
    input[0].placeholder='FirstName requierd'
     input[0].value=''
     i+=1
}
if(input[1].value==='' ){
    input[1].placeholder='lastName requierd'
     input[1].value=''
     i+=1
}
console.log(isValidEmail(input[2].value));
if(input[2].value===''  || isValidEmail(input[2].value)==null){
    input[2].placeholder='email requierd or Email is not correct'
     input[2].value=''
     i+=1
}
console.log('pa' ,isValidPassword(input[3].value));
if(input[3].value===input[4].value && isValidPassword(input[3].value) && i===0){
    
    console.log('Hjehj');
    btn.style.cursor='not-allowed'
    const formData={
        fName:input[0].value,
        lName:input[1].value,
        Email:input[2].value,
        pass:input[4].value,
      }

      fetch('/authentication?authType=signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
          // Add any additional headers if needed
        },
        body: JSON.stringify(formData) // Convert the data object to a JSON string
      })
        .then(response => {
          if (!response.ok) {
            btn.style.cursor='pointer'
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Parse the JSON response
        })
        .then(data => {
          if(data.succees){
          modal.style.display="block";
          chat_num.innerText=data.chat_id;
          console.log('POST request successful:', data);
          }
          else{
            btn.style.cursor='pointer'
            input[2].value=''
            input[2].placeholder=data.reason
          }
        })
        .catch(error => {
          btn.style.cursor='pointer'
          console.error('Error making POST request:', error);
        });

    }
    else {
        input[4].placeholder='repeat password and password must be same and requierd'
        console.log('kkn');
        input[3].placeholder='repeat password and password must be same and requierd'
        console.log('kkn');
        input[3].value=''
        input[4].value=''
    }
    
})