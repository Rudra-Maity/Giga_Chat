const cancel_text_btn=document.getElementById('cancel-text-btn');
const serachBar=document.getElementById("bar");
const recommendations=document.getElementById('recommendations');

function searchInput(){
// cancel_text_btn.style.display="inline";
cancel_text_btn.style.display=serachBar.value ? 'inline':"none";
recommendations.style.display=serachBar.value ? 'block':"none";

console.log(serachBar.value);
}
function cancelSearch(){
    cancel_text_btn.style.display="none"
    recommendations.style.display="none";
    serachBar.value=''
}