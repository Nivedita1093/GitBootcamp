window.onload=function f1()
{
input = document.getElementById("myInput");
input.addEventListener("keyup", function(event)
  {event.preventDefault();
      if (event.keyCode == 13)
        {
        document.getElementById("addBtn").click();
        }
  }); 
};


var dynamicdivid=0;
var a=-1;


function newElement() 
{
  if(a!=-1)
  {
   dynamicdivid=a;
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
    tododiv.innerHTML= '<span id=values_'+dynamicdivid+'>'+inputValue+'</span><span class="btn-span"><button onclick="statusElement('+dynamicdivid+')" class="statusbutton">Done</button> <button onclick="editElement('+dynamicdivid+')" class="editbutton">Edit</button><button onclick="delElement('+dynamicdivid+')" class="delbutton">Delete</button>  </span>';
    document.getElementById("parentdiv").appendChild(tododiv);

    }
  document.getElementById("myInput").value = "";
  //dynamicdivid=t;
  a=-1;
  }


else
{  var tododiv = document.createElement('div');

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
    tododiv.innerHTML= '<span id=values_'+dynamicdivid+'>'+inputValue+'</span><span class="btn-span">  <button onclick="statusElement('+dynamicdivid+')" class="statusbutton">Done</button> <button onclick="editElement('+dynamicdivid+')" class="editbutton">Edit</button><button onclick="delElement('+dynamicdivid+')" class="delbutton">Delete</button></span>';
    document.getElementById("parentdiv").appendChild(tododiv);

    }
document.getElementById("myInput").value = "";
//t=dynamicdivid++;
dynamicdivid++;
}
}



function delElement(div_id)
{
var elem=document.getElementById(div_id);  //to get the entire div 
elem.remove();
}


function editElement(div_id)
{
a=div_id;
var task_val=document.getElementById('values_'+div_id).innerHTML;    //to get the elements by span id
document.getElementById(div_id).remove();
document.getElementById("myInput").value=task_val;
//document.getElementById(div_id).value=task_val;
}


function statusElement(div_id)
{
document.getElementById(div_id).style.backgroundColor="#33ff008c";
}



