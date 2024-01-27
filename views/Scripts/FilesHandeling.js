const files_upload=document.getElementById("files-upload");
const chat_bar=document.getElementById('chat-box');
const content=document.getElementById('content');
const after_add_files=document.getElementById('after-add-files');
const files_svg=document.getElementById('svg-file-icon')
const card_box=document.getElementById('card-box');

// function UploadFiles(){
//     console.log('ff');
// }
function Files(){
    const Files=files_upload.files;
    console.log(Files);
    
    for (let each_file of Files) {
        
        let FileIcon=document.createElement("div")
        card_box.appendChild(FileIcon);
        FileIcon.className="add-files";
        FileIcon.id=each_file.name
        FileIcon.innerHTML=`<svg class="svg-file-icon" xmlns="http://www.w3.org/2000/svg" height="36" width="32"
        viewBox="0 0 384 512">
        <path
            d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
            fill="blue" />
    </svg>`
    }
    console.log(card_box);

    chat_bar.style.display="none";
    content.style.display="none";
    after_add_files.style.display="flex";
}

function cancel_upload(){
    files_upload.value=''
    
    chat_bar.style.display="flex";
    content.style.display="flex";
    after_add_files.style.display="none";
    console.log(files_upload.files);
    card_box.innerHTML=''
}