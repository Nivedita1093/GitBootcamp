import java.lang.*;

import java.util.Date;

import java.util.Calendar;



class MyCalendar
{
public static void main(String args[])
{
String daysdisplay[] 	= 	{"","Mon","Tue","Wed","Thu","Fri",""};
Calendar mycal=Calendar.getInstance();


int year=mycal.get(Calendar.YEAR);
int month=mycal.get(Calendar.MONTH);
int date=mycal.get(Calendar.DATE);
int day_of_week=mycal.get(Calendar.DAY_OF_WEEK);

System.out.println(year);
System.out.println(month);
System.out.println(date);
System.out.println(day_of_week);



int leap=0;
if((year%4==0||year%400==0)&&year%100!=0)
{
leap=1;
}

int no_of_days;
month++;

if(month<8)
{
if(month%2!=0 && month!=2)
{
no_of_days=30;
}
else if(month==2 && leap==1)
{
no_of_days=29;
}
else if(month==2 && leap==0)
{
no_of_days=28;
}
else
{
no_of_days=31;
}
}
else
{
if(month%2==0 && month!=2)
{
no_of_days=31;
}
else
{
no_of_days=30;
}
}





for(int i=0;i<daysdisplay.length;i++)
{
System.out.print(daysdisplay[i]+"\t");
}
System.out.println("\n");



int k=0;

for(int m=1;m<day_of_week;m++)
{
	System.out.print("" + "\t");
	k++;
}





for(int j=date;j<=no_of_days;j++)
{
	/* if(j<date)
	{
		//System.out.print("" + "\t");
		k++;
	}
	else
	{ */
		if((k==0)||(k==6))
		{
		System.out.print(""+"\t");
		k++;
		}
		else
		{
		System.out.print(j + "\t");
		k++;
		}
	// }
if(k%7==0)
{
	System.out.println("\n");
	k=0;
}

}


}
}