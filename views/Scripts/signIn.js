
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
console.log('pa' ,isValidPassword(input[1].value));
if(isValidPassword(input[1].value) && i===0){
  btn.style.cursor='not-allowed'
    console.log('Hjehj');
    const formData={
        userId:input[0].value,
        pass:input[1].value,
      }

      fetch('/authentication?authType=signin', {
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
          console.log(data);
          if(data.succees){
          console.log('POST request successful:', data);
          window.location.replace('/')
          }
          else if(data.userIdErr){
            btn.style.cursor='pointer'
            input[0].value=''
            input[0].placeholder=data.userIdErr
          }
          else if(data.passErr){
            btn.style.cursor='pointer'
            input[1].value=''
            input[1].placeholder="password does not matched"
          }
          else{ 
            btn.style.cursor='pointer'
            alert('Some Other Error')}
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