window.onload=function f1()
{
get_from_db();
get_taskcategory();
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


function get_taskcategory()       //for the dropdown menu
{
$.ajax({
          type: "GET",
          url: 'http://localhost:50898/api/ToDoCategories',
          async:true, 
          dataType:"json",
          crossDomain:true,
           success: function(response) 
          {
            for(var i=0;i<response.length;i++)
            {
              var li=response[i].ToDo_Category;
              var abc=document.createElement('option');
              abc.innerHTML=li;
              abc.value=li;
              document.getElementById("mydropdown").appendChild(abc);
            }

          }
          
          
      });
}


//var t
function get_from_db()  //get from database on reload
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
            var stat=response[i].ToDo_Status;
            //var dynamicdivid=db_id;
            var tododiv = document.createElement('div');
            //tododiv.id=dynamicdivid;
            tododiv.id=db_id;
            tododiv.setAttribute("class","divclass");
            tododiv.innerHTML= '<span id=values_'+db_id+'>'+response[i].ToDo_Description+'</span><span class="btn-span"><button onclick="statusElement('+db_id+')" class="statusbutton">Done</button><button onclick="editElement('+db_id+')" class="editbutton">Edit</button><button onclick="delElement('+db_id+')" class="delbutton">Delete</button>  </span>';
            document.getElementById("parentdiv").appendChild(tododiv);
            if(stat==0)
              {
              document.getElementById(db_id).style.backgroundColor="#ffd06582";
              }
            else
              {
              document.getElementById(db_id).style.backgroundColor="#33ff008c";
              }


            }

          }
          
          
      });
}


function delElement(div_id)   //delete an element by id
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
function newElement() //used for new element creation and also called when edit element
{

//var date=new Date();

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

//date_val.toISOString()


function post(to_do_des)    //used to post values at new element creation
      {
        $.ajax({
          type: "POST",
          url: 'http://localhost:50898/api/mytodolist/post',
          async:true, 
          dataType:"json",
          data:{"ToDo_Description":to_do_des,"ToDo_Status": "0","CreateDate": "2018-11-05T00:00:00","Category_ID":"1"},
          crossDomain:true,
          success: function(response) 
          {
            alert("Your content has been added");
          }
        });
      }





var gbid; 
var gb;
function editElement(div_id)    //called on click of edit element
{
  flag=1;
  gbid = "values_"+div_id;
  gb=div_id;
  var inputVal=document.getElementById(gbid).innerHTML;
  document.getElementById("myInput").value=inputVal;
}



function edit_ele(div_id,to_do_change)   //used to put values at edit element
{ 
     $.ajax({
          type:"PUT",
          url:'http://localhost:50898/api/ToDoes/'+div_id,
          async:true, 
          dataType:"json",
          crossDomain:true,
          data:{"ToDo_ID":div_id,"ToDo_Description":to_do_change,"ToDo_Status": "0","CreateDate": "2018-11-05T00:00:00","Category_ID":"1"},
          success: function(response)
          {
            document.getElementById(gbid).innerHTML=to_do_change;
            // alert("Your content has been edited");
            // location.reload();
          }
        });
}





var stat_id;
var todo_des;
var todo_status;
var datecreate;
var categoryid;

function statusElement(div_id)  //to change complete/incomplete status of a task
{

  $.ajax ({
          type: "GET",
          url: 'http://localhost:50898/api/ToDoes/'+div_id,
          async:true, 
          dataType:"json",
          crossDomain:true,
           success: function(response) 
          {
            
            stat_id=response.ToDo_ID;
            todo_des=response.ToDo_Description;
            todo_status=response.ToDo_Status;
            datecreate=response.CreateDate;
            categoryid=response.Category_ID;
            
            /*console.log(stat_id);
            console.log(todo_des);
            console.log(todo_status);
            console.log(datecreate);
            console.log(categoryid);*/

            if(todo_status==0)
            {
            todo_status=1;
            document.getElementById(div_id).style.backgroundColor="#33ff008c";
            }
            else
            {
            todo_status=0;
            document.getElementById(div_id).style.backgroundColor="#ffd06582";
            }

            $.ajax({
                  type: "PUT",
                  url: 'http://localhost:50898/api/ToDoes/'+div_id,
                  async:true, 
                  dataType:"json",
                  crossDomain:true,
                  data:{"ToDo_ID":stat_id,"ToDo_Description":todo_des,"ToDo_Status":todo_status,"CreateDate":datecreate,"Category_ID":categoryid},
                  success: function(response) 
                  {    
                  alert("status has been updated");
                  }
          
          
                  });

          }
          });

}
