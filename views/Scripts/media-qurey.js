const back_to_contact=document.getElementById('back-to-contact');
const contact_view=document.getElementById('contact-view');

// function WidthHandel(){
//     console.log(window.innerWidth);
    
// if(window.innerWidth<=676){
//     back_to_contact.style.display="block"
//     return true
// }
// else back_to_contact.style.display="none"
// }
// window.addEventListener("resize",WidthHandel)

window.addEventListener("resize",()=>{
    
}) 
document.addEventListener("click",(e)=>{
    
    if((e.target.className==='contact-item' || e.target.className==='contacts-name' || e.target.className==='contact-pic' ||e.target.className==='contact-item-name') && window.innerWidth<=676){
        console.log('dfdd');
        contact_view.style.flex="0"
    }
})

function backToContact(){
    contact_view.style.flex="100%"
}