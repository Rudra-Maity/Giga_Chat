function dropMenu() {
    const dropdown = document.getElementById('dropdown');

    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}

const body=document.getElementsByTagName("body")[0];

body.addEventListener("contextmenu",(e)=>{
    e.preventDefault()
    console.log('fuck you');
})

document.addEventListener("dragstart",(e)=>{
    if(e.target.tagName.toLowerCase()==='img'){
        e.preventDefault()
        console.log('not allowed');
    }
})


function saveButton(){
    const dropdown = document.getElementById('save-list');

    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}

function fileUpload(input){
    
    if (input.files.length > 0) {
    } else {
    }
}


const pic=document.getElementById('pic');

function onProfile(){
    const chat_room=document.getElementById('chat-room');
    const contact_view=document.getElementById("contact-view");
    const user_profile_container=document.getElementById("user-profile-container");

    if(contact_view.style.display==='none'){
        contact_view.style.display="block";
        console.log('frfr');
        user_profile_container.style.display="none"
        user_profile_container.style.transition="0.3s"
    }
    else {
        contact_view.style.display="none";
        console.log('sdfsad');
        user_profile_container.style.display="flex"
        user_profile_container.style.transition="0.3s"
        // chat_room.style.display='flex'

    }

}

// document.addEventListener("click",(e)=>{
//     if (e.target.tagName === 'a' && !(e.target.className === 'AHC')) {
//         e.preventDefault();
//     }
// }) 