import java.util.*;
import java.util.Scanner; 
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;


class MyCalculator
{
	public static void main(String args[])
	{
	System.out.println("enter an expression");
	Scanner sc=new Scanner(System.in);
	String exp=sc.nextLine();
	//System.out.println(exp.length());
	
	int start=0;
	int end=0;
	ArrayList al=new ArrayList();
	
		for(int i=0;i<exp.length();i++)
		{
			if(exp.charAt(i)=='+'||exp.charAt(i)=='-'||exp.charAt(i)=='*'||exp.charAt(i)=='/')
			{ 	
				end=i;
				al.add(exp.substring(start,end));
				al.add(exp.charAt(i));
				start=i+1;
				
			}

		}
		end=exp.length();
		al.add(exp.substring(start,end));
		
		MyCalculator obj=new MyCalculator();
		MyCalculator.writefile(al);
		obj.operate(al);
					
		
	}
		public static void operate(ArrayList al)
		{
			    
			    
			
				while(al.contains('/'))
				{
					int a=al.indexOf('/');
					//System.out.println("index of / "+a);
					float b=Float.parseFloat(al.get(a-1)+"")/Float.parseFloat(al.get(a+1)+"");
					//System.out.println(b);
					for (int i=0;i<3;i++)
					{
					al.remove(a-1);
					}
					al.add(a-1,b);
					System.out.println(al);
					MyCalculator.writefile(al);
					
				}

				
				while(al.contains('*'))
				{
				int a=al.indexOf('*');
				float b=Float.parseFloat(al.get(a-1)+"")*Float.parseFloat(al.get(a+1)+"");
				for (int i=0;i<3;i++)
				{
				al.remove(a-1);
				}
				al.add(a-1,b);
				System.out.println(al);
				MyCalculator.writefile(al);
				}
				
				while(al.contains('+'))
				{
				int a=al.indexOf('+');
				float b=Float.parseFloat(al.get(a-1)+"")+Float.parseFloat(al.get(a+1)+"");
				for (int i=0;i<3;i++)
				{
				al.remove(a-1);
				}
				al.add(a-1,b);
				System.out.println(al);
				MyCalculator.writefile(al);
				}

				while(al.contains('-'))
				{
				int a=al.indexOf('-');
				float b=Float.parseFloat(al.get(a-1)+"")-Float.parseFloat(al.get(a+1)+"");
				for (int i=0;i<3;i++)
				{
				al.remove(a-1);
				}
				al.add(a-1,b);
				System.out.println(al);
				MyCalculator.writefile(al);
				}
		
		
		}

	
	  public static void writefile( ArrayList<String> data) 
	  {
       
        try {
			   FileWriter fw=new FileWriter("C:/java-calculator/FileWriter.txt",true);    
			   fw.write(" "+data+System.getProperty("line.separator"));    
			   
			   fw.close();  	
			} 
		catch (IOException e) 
			{
			System.out.println("file created");
            
			e.printStackTrace();
			}
		
	  } 
	
}