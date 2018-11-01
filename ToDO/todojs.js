var dynamicdivid=0;
//var dynamicdivclass=0;
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

    tododiv.innerHTML=inputValue+'<span class="btn-span"> <button onclick="editElement('+dynamicdivid+')" class="editbutton">Edit</button>'+
    '<button onclick="delElement('+dynamicdivid+')" class="delbutton">Delete</button></span>';
    document.getElementById("parentdiv").appendChild(tododiv);
    tododiv.value=inputValue;
    }
  document.getElementById("myInput").value = "";
dynamicdivid++;
//dynamicdivclass++;
}



function delElement(task_id)
{
var elem = document.getElementById(task_id);
elem.remove();
}



function editElement(task_id)
{
var task_val = document.getElementById(task_id).value;
document.getElementById("myInput").value=task_val;
document.getElementById(task_id).remove();

}

