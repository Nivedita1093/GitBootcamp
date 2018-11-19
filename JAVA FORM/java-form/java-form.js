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
            cell4.innerHTML='<button class="btn btn-primary" id='+row.id+'>Edit</button>'+'<button class="btn btn-primary" id='+row.id+'>Delete</button>';
            }
        }
    });
}



function register () {
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


