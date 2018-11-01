var dynamicdivid=0;

function newElement() 
{
  var tododiv = document.createElement('div');

  tododiv.id=dynamicdivid;
  tododiv.setAttribute("class","divclass");
  //tododiv.className=dynamicdivclass;

  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') 
    {
    alert("You must write something!");
    }
  else 
    {
    tododiv.innerHTML='<span id="content_'+dynamicdivid+'">'+inputValue+'</span><span class="btn-span"> <button onclick="editElement('+dynamicdivid+')" class="editbutton">Edit</button>'+
    '<button onclick="delElement('+dynamicdivid+')" class="delbutton">Delete</button></span>';
    document.getElementById("parentdiv").appendChild(tododiv);

    }
document.getElementById("myInput").value = "";
dynamicdivid++;
}



function delElement(task_id)
{
var elem=document.getElementById(task_id);
elem.remove();
}



function editElement(task_id)
{

var task_val=document.getElementById("content_"+task_id).innerHTML;
// task_val.split("<span");
// console.log(task_val);
document.getElementById("myInput").value=task_val;
document.getElementById(task_id).remove();

}

