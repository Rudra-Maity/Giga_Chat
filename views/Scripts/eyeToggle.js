const form=document.getElementsByTagName("form")[0];
const EyeSpan=document.createElement("span");
EyeSpan.className='password-toggle-icon';
EyeSpan.innerHTML='<i class="fas fa-eye"></i>';
form.appendChild(EyeSpan);

const passwordField = document.getElementById("rep_pass");
const pass= document.getElementById("pass");
        const togglePassword = document.querySelector(".password-toggle-icon i");
        
        togglePassword.addEventListener("click", function () {
          if (passwordField.type === "password") {
            passwordField.type = "text";
            pass.type='text';
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");
          } else {
            passwordField.type = "password";
            pass.type='password';
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");
          }
        });