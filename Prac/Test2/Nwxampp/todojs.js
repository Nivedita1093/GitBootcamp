window.onload=function f1()
{
get_from_db();
input = document.getElementById("myInput");
input.addEventListener("keyup", function(event)
  {   
      event.preventDefault();
      if (event.keyCode == 13)
        {
        document.getElementById("addBtn").click();
        }
  }); 
};


function get_from_db()
{
$.ajax({
          type: "GET",
          url: 'http://localhost:50898/api/mytodolist/get',
          async:true, 
          dataType:"json",
          crossDomain:true,
           success: function(response) 
          {
            for(var i=0;i<response.length;i++)
            {
            var db_id=response[i].ToDo_ID;
            var dynamicdivid=db_id;
            var tododiv = document.createElement('div');
            tododiv.id=dynamicdivid;
            tododiv.setAttribute("class","divclass");
            tododiv.innerHTML= '<span id=values_'+dynamicdivid+'>'+response[i].ToDo_Description+'</span><span class="btn-span"><button onclick="statusElement('+dynamicdivid+')" class="statusbutton">Done</button> <button onclick="editElement('+dynamicdivid+')" class="editbutton">Edit</button><button onclick="delElement('+dynamicdivid+')" class="delbutton">Delete</button>  </span>';
            document.getElementById("parentdiv").appendChild(tododiv);
            }

          }
          
          
      });
}


function post(to_do_des)
      {
        $.ajax({
          type: "POST",
          url: 'http://localhost:50898/api/mytodolist/post',
          async:true, 
          dataType:"json",
          data:{"ToDo_Description":to_do_des,"ToDo_Status": "1","CreateDate": "2018-11-05T00:00:00"},
          crossDomain:true,
          success: function(response) 
          {
            alert("Your content has been added");
          }
        });
      }

function newElement() 
{

  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') 
    {
    alert("You must write something!");
    }
  else
    {
    post(inputValue);
    location.reload();
    document.getElementById("myInput").value = "";
    }
}
 


/*function delElement(div_id)
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
*/