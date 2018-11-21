package com.bhaiti.kela.controllers;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import com.bhaiti.kela.beans.StudentRegistration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
@Controller
public class StudentDeleteController {
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(method = RequestMethod.DELETE, value="/delete/student/{regdNum}")
@ResponseBody
public JSONArray deleteStudentRecord(@PathVariable("regdNum") String regdNum) {
System.out.println("In deleteStudentRecord");
int id_rem=Integer.parseInt(regdNum);
JSONArray object;
JSONParser parser = new JSONParser();
  try
  	{
	 FileReader rt=new FileReader("C:/java-json/StudentData.json");
	 object = (JSONArray)parser.parse(rt);
	} 
catch (Exception e) 
	{
    e.printStackTrace();
    object= new JSONArray();
	}
  
//  for(int i=0;i<object.size();i++)
//  {
//	  if(i==id_rem)
//	  {
		  object.remove(id_rem);
//	  }
//  }
		  try
		  		{
		  		FileWriter fw=new FileWriter("C:/java-json/StudentData.json",false);    
		  		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		  		
		  		fw.write(object.toJSONString());
		  		fw.close();  	
		  		System.out.println("file created");
		  		} 
		  		catch (IOException e) 
		  		{
		  		System.out.println("file NOT  created");
		  	    e.printStackTrace();
		  		}
		  		
  return object;


   //return StudentRegistration.getInstance().deleteStudent(regdNum);
}
}