function get()
{
	//var resp;

$.ajax({
					type: "GET",
					url: 'http://localhost:50898/api/mytodolist/get',
					async:true, 
					dataType:"json",
					crossDomain:true,
					success: function(response) {
						alert("hello");
						//resp=response;
						console.log(response);
						var mydiv = document.createElement('div');
						document.getElementById("idofdiv").append(mydiv);
						//console.log(data);
						for(i=0;i<response.length;i++)
						{
							//mydiv.innerHTML+=data[i]['ToDo_Description'];
							mydiv.innerHTML+=response[i].ToDo_ID+response[i]['ToDo_Description'];
						}
					}
				});
		/*var request = new XMLHttpRequest();
		var data=0;
		request.open('GET','http://localhost:50898/api/mytodolist/get', true);

		request.onload = function ()
		{
			data = JSON.parse(this.response);
		}
		request.send();*/



	
}



/*function post()
{
var request1 = new XMLHttpRequest();
request1.open('POST','http://localhost:50898/api/mytodolist/post', true);
var senddata={"ToDo_Description": "My ToDo10","ToDo_Status": "1","CreateDate": "2018-11-05T00:00:00"};
//request1.setRequestHeader( 'Access-Control-Allow-Origin', '*');
request1.setRequestHeader("Content-Type", "application/json");
request1.send(senddata);
}*/

function post()
			{
				//alert("post");
				$.ajax({
					type: "POST",
					url: 'http://localhost:50898/api/mytodolist/post',
					async:true, 
					dataType:"json",
					data:{"ToDo_Description": "My ToDo10","ToDo_Status": "1","CreateDate": "2018-11-05T00:00:00"},
					crossDomain:true,
					success: function(response) {
						alert("hello");
						console.log(response);
					}
				});
			}