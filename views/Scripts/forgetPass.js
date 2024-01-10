
const signIn=document.getElementById('signIn');
const input=document.querySelectorAll('.inp');
const btn=document.getElementById('btn');



btn.addEventListener('click',(e)=>{
    e.preventDefault();
    var i=0

console.log(isValidEmail(input[0].value));
if(input[0].value===''  || isValidEmail(input[0].value,true)==null){
    input[0].placeholder='email requierd or Email is not correct'
     input[0].value=''
     i+=1
}
console.log('pa' ,isValidPassword(input[1].value),input[1]===input[2]);
if(input[1].value===input[2].value && isValidPassword(input[1].value) && i===0){
  btn.style.cursor='not-allowed'
    console.log('Hjehj');
    const formData={
        userId:input[0].value,
        pass:input[1].value,
      }

      fetch('/authentication?authType=forgetpassword', {
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
          console.log('POST request successful:', data);
          window.location.replace('/authentication?authType=signin')
          }
          else if(data.userIdErr){
            btn.style.cursor='pointer'
            input[0].value=''
            input[0].placeholder=data.requierdErr
            input[1].value=''
            input[1].placeholder=data.requierdErr
            input[2].value=''
            input[2].placeholder=data.requierdErr
          }
          
          else alert('Some Other Error')
        })
        .catch(error => {
          btn.style.cursor='pointer'
          console.error('Error making POST request:', error);
        });

    }
    else {
        input[2].placeholder='repeat password and password must be same and requierd'
        console.log('kkn');
        input[1].placeholder='repeat password and password must be same and requierd'
        console.log('kkn');
        input[2].value=''
        input[1].value=''
    }
    
})