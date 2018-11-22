window.onload=function f1()
{
get_from_db();
get_taskcategory();
get_taskcategory_select();
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


var tsk;
var tsk_cat;

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
              tsk=response[i].ToDo_CategoryID;
              tsk_cat=response[i].ToDo_Category;
              var abc=document.createElement('option');
              abc.id="tskid_"+tsk;
              abc.setAttribute("class","dropclass");
              abc.innerHTML=tsk_cat;
              abc.value=tsk_cat;
              document.getElementById("mydropdown").appendChild(abc);
            }
          }     
      });
}






var tsk1;
var tsk_cat1;

function get_taskcategory_select()       //for the dropdown menu select
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
              tsk1=response[i].ToDo_CategoryID;
              tsk_cat1=response[i].ToDo_Category;
              var abc=document.createElement('option');
              abc.id="tskid_t"+tsk1;
              abc.setAttribute("class","select_dropclass");
              abc.innerHTML=tsk_cat1;
              abc.value=tsk_cat1;
              document.getElementById("select_dropdown").appendChild(abc);
            }
          }     
      });
}


var drp_val;
var sel_cat;
function sel_drp()
{
drp_val=document.getElementById("select_dropdown").value;
//console.log(drp_val);
if(drp_val=="Daily Task")
{
sel_cat=1;
}
else if(drp_val=="Weekly Task")
{
sel_cat=2;
}
}



function tasks()     // to display daily and weekly tasks
{
var m=document.getElementById("mydropdown").value;
//console.log(m);
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
              var id_todo=response[i].ToDo_ID;
              var stat_todo=response[i].ToDo_Status;
              tsk=response[i].Category_ID;
              //console.log(stat_todo);
              if(m=="Daily Task")
              {
              if(tsk==1)
                {
                  while (parentdiv.hasChildNodes())
                  {
                  parentdiv.removeChild(parentdiv.lastChild);
                  }
                  //parentdiv.remove();
                  var todo_div = document.createElement('div');
                  todo_div.id=id_todo;
                  todo_div.setAttribute("class","divclass");
                  todo_div.innerHTML= '<span id=values_'+id_todo+'>'+response[i].ToDo_Description+'</span>';
                  document.getElementById("parentdiv").appendChild(todo_div);

                }
              }
              else if(m=="Weekly Task")
              {
              if(tsk==2)
                {
                  while (parentdiv.hasChildNodes())
                  {
                  parentdiv.removeChild(parentdiv.lastChild);
                  }
                  var todo_div = document.createElement('div');
                  todo_div.id=id_todo;
                  todo_div.setAttribute("class","divclass");
                  todo_div.innerHTML= '<span id=values_'+id_todo+'>'+response[i].ToDo_Description+'</span>';
                  document.getElementById("parentdiv").appendChild(todo_div);
                }
              }
              else
              {
              location.reload();
              }
            
            }
          }     
      });
  
}



var db_id;
var stat;

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
            db_id=response[i].ToDo_ID;
            stat=response[i].ToDo_Status;
            //var dynamicdivid=db_id;
            var tododiv = document.createElement('div');
            //tododiv.id=dynamicdivid;
            tododiv.id=db_id;
            tododiv.setAttribute("class","divclass");
            tododiv.innerHTML= '<span  id=values_'+db_id+'>'+response[i].ToDo_Description+'</span><span class="btn-span"><button onclick="statusElement('+db_id+')" class="statusbutton">Done</button><button onclick="editElement('+db_id+')" class="editbutton">Edit</button><button onclick="delElement('+db_id+')" class="delbutton">Delete</button>  </span>';
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
var date=new Date();
 if(flag==0)
 {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') 
    {
    alert("You must write something!");
    }
  else
    {
    post(inputValue,date);
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




function post(to_do_des,date_val)    //used to post values at new element creation
      {
        console.log(sel_cat);
        $.ajax({
          type: "POST",
          url: 'http://localhost:50898/api/mytodolist/post',
          async:true, 
          dataType:"json",
          data:{"ToDo_Description":to_do_des,"ToDo_Status": "0","CreateDate":date_val.toISOString(),"Category_ID":sel_cat},
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

 $.ajax ({
          type: "GET",
          url: 'http://localhost:50898/api/ToDoes/'+div_id,
          async:true, 
          dataType:"json",
          crossDomain:true,
           success: function(response) 
          {
            
            stat_id=response.ToDo_ID;
           // todo_des=response.ToDo_Description;
            todo_status=response.ToDo_Status;
            datecreate=response.CreateDate;
            categoryid=response.Category_ID;
            

          $.ajax({
          type:"PUT",
          url:'http://localhost:50898/api/ToDoes/'+div_id,
          async:true, 
          dataType:"json",
          crossDomain:true,
          data:{"ToDo_ID":stat_id,"ToDo_Description":to_do_change,"ToDo_Status":todo_status,"CreateDate":datecreate,"Category_ID":categoryid},
          success: function(response)
          {
            document.getElementById(gbid).innerHTML=to_do_change;
            // alert("Your content has been edited");
            // location.reload();
          }
          });

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



