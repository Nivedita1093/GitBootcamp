function display(arg)
{
	document.getElementById("calc-out").innerHTML+=arg;
}

function clearmy()
{
	document.getElementById("calc-out").innerHTML="";
}


function mycalc()
{
	var arr=[];
	var start=0;
	var end=0;

	var calcin=document.getElementById("calc-out").innerHTML;

	if(calcin=="")
	{
	alert("Enter some value");
	}
	else
	{
		for(i=0;i<calcin.length;i++)
		{
			if(calcin.charAt(i)=='+'||calcin.charAt(i)=='-'||calcin.charAt(i)=='*'||calcin.charAt(i)=='/')
			{ 	
				end=i;
				arr.push(calcin.substring(start,end));
				arr.push(calcin.charAt(i));
				start=i+1;
				
			}

		}
		end=calcin.length;
		arr.push(calcin.substring(start,end));

	}

	operate(arr);
	//console.log(arr);
	clearmy();
	display(arr);
}




function operate(arr)
{
while (arr.includes('/'))
{
	var a=arr.indexOf('/');
	var b=parseInt(arr[a-1])/parseInt(arr[a+1]);
	arr.splice(a-1,3);
	arr.splice(a-1,0,b);
}

while (arr.includes('*'))
{
	var a=arr.indexOf('*');
	var b=parseInt(arr[a-1])*parseInt(arr[a+1]);
	arr.splice(a-1,3);
	arr.splice(a-1,0,b);
}

while (arr.includes('-'))
{
	var a=arr.indexOf('-');
	var b=parseInt(arr[a-1])-parseInt(arr[a+1]);
	arr.splice(a-1,3);
	arr.splice(a-1,0,b);
}

while (arr.includes('+'))
{
	var a=arr.indexOf('+');
	var b=parseInt(arr[a-1])+parseInt(arr[a+1]);
	arr.splice(a-1,3);
	arr.splice(a-1,0,b);
}


}
