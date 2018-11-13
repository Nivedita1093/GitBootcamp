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



//var t;

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
            tododiv.innerHTML= '<span id=values_'+dynamicdivid+'>'+response[i].ToDo_Description+'</span><span class="btn-span"><button onclick="statusElement('+db_id+')" class="statusbutton">Done</button> <button onclick="editElement('+db_id+')" class="editbutton">Edit</button><button onclick="delElement('+db_id+')" class="delbutton">Delete</button>  </span>';
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



function delElement(div_id)
 {
        $.ajax({
          type: "DELETE",
          url: 'http://localhost:50898/api/ToDoes/'+div_id,
          async:true, 
          dataType:"json",
          crossDomain:true,
          success: function(response) 
          {
            alert("Your content has been deleted");
            location.reload();
          }
        });
 }


var flag=0;

function newElement() 
{
 if(flag==0)
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
 else
 {
    var t=document.getElementById("myInput").value;
    edit_ele(gb,t);
    document.getElementById("myInput").value = "";
    
 }
}




var gbid; 
var gb;
function editElement(div_id)
{
  flag=1;
  gbid = "values_"+div_id;
  gb=div_id;
  var inputVal=document.getElementById(gbid).innerHTML;
  document.getElementById("myInput").value=inputVal;
}



function edit_ele(div_id,to_do_change)
{ 
     $.ajax({
          type:"PUT",
          url:'http://localhost:50898/api/ToDoes/'+div_id,
          async:true, 
          dataType:"json",
          crossDomain:true,
          data:{"ToDo_ID":div_id,"ToDo_Description":to_do_change,"ToDo_Status": "1","CreateDate": "2018-11-05T00:00:00"},
          success: function(response)
          {
            document.getElementById(gbid).innerHTML=to_do_change;
            // alert("Your content has been edited");
            // location.reload();
          }
        });
}
