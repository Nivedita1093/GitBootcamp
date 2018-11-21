function getvalues()
{
$.ajax({
        type: "GET",
        url: 'http://localhost:8083/student/allstudent',
        async:true, 
        dataType:"json",
        crossDomain:true,
        success: function(response) {
            //console.log(response);
            //alert("success");
            for(var i=0;i<response.length;i++)
            {
            var table = document.getElementById("myTable");
            // console.log(table);
            var row=table.insertRow(i+1);
            row.id=response[i].registrationNumber;
            var cell1=row.insertCell(0);
            var cell2=row.insertCell(1);
            var cell3=row.insertCell(2);
            var cell4=row.insertCell(3); 
            /*cell1.innerHTML="a";
            cell2.innerHTML="b";
            cell3.innerHTML="c";*/
            cell1.innerHTML=response[i].name;
            cell2.innerHTML=response[i].age;
            cell3.innerHTML=response[i].registrationNumber;
            cell4.innerHTML='<button class="btn btn-primary" id='+row.id+' onclick="editElement('+i+')">Edit</button>'+'<button class="btn btn-primary" id='+row.id+' onclick="delElement('+i+')">Delete</button>';
            }
        }
    });
}



function register () {
    console.log("flagrecevd="+flag);
    if(flag==0)
    {
	var std_name=document.getElementById("inputStdname").value;
	var age=document.getElementById("age").value;
	var reg_no=document.getElementById("registration_number").value;
	$.ajax({
    	type: "POST",
   		url: 'http://localhost:8083/register/student',
    	async:true, 
    	dataType:"json",
    	data:{"name":std_name,"age":age,"registrationNumber":reg_no},
    	crossDomain:true,  
    	success: function(response) {
    		console.log(response);
    	}
	});
    }

    else
    {
    var std_name=document.getElementById("inputStdname").value;
    var age=document.getElementById("age").value;
    var reg_no=document.getElementById("registration_number").value;
    $.ajax({
        type: "PUT",
        url: 'http://localhost:8083/update/student/'+my_editid,
        async:true, 
        dataType:"json",
        data:{"name":std_name,"age":age,"registrationNumber":reg_no},
        crossDomain:true,
        success: function(response) {
            alert("in edit register");
            console.log(response);
        }
    });
    }
    flag=0;
}



function delElement(arr_id)
 {

        $.ajax({
          type: "DELETE",
          url: 'http://localhost:8083/delete/student/'+arr_id,
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
/*var stdname;
var stdage;
var regno;*/
function editElement(arr_id)
 {
        //console.log("flagset="+flag);
       //localStorage.setItem("lcl_st",flag);
        $.ajax({
        type: "GET",
        url: 'http://localhost:8083/student/allstudent/'+arr_id,
        async:true, 
        dataType:"json",
        crossDomain:true,
        success: function(response) {
            localStorage.setItem("stdn",response.name);
            localStorage.setItem("stda",response.age);
            localStorage.setItem("stdreg",response.registrationNumber);

            localStorage.setItem("my_arrid",arr_id);
           // localStorage.setItem("my_flag",flag);
        }
    });
    
    
    window.location.href="index.html";
   // flag=1;
    //console.log("flagset="+flag);

}

var my_editid;
function getlocalstg()
{
//console.log(localStorage.getItem('stdn'));
var rsname=localStorage.getItem('stdn');
;
my_editid=localStorage.getItem('my_arrid')
if (rsname){
document.getElementById("inputStdname").value=localStorage.getItem('stdn');
document.getElementById("age").value=localStorage.getItem('stda');
document.getElementById("registration_number").value=localStorage.getItem('stdreg');
flag=1;
console.log("flagset="+flag);
localStorage.clear();
}

//console.log("flagset="+flag);
}




/*function editElement(arr_id)
 {

        $.ajax({
          type: "PUT",
          url: 'http://localhost:8083/update/student'+arr_id,
          async:true, 
          dataType:"json",
          crossDomain:true,
          success: function(response) 
          {
            alert("Your content has been edited");
            location.reload();
          }
        });
 }*/
