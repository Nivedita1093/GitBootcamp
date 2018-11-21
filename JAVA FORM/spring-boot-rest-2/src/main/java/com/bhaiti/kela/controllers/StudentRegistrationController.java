package com.bhaiti.kela.controllers;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.bhaiti.kela.beans.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

@Controller
public class StudentRegistrationController
{
JSONArray std_jsonarray=new JSONArray();   
   
@CrossOrigin(origins = "http://localhost:8080")
		// @RequestMapping(method = RequestMethod.POST, value="/register/student")
@RequestMapping(method = RequestMethod.POST, value="/register/student",produces = {"application/json", "application/xml"},consumes = {"application/x-www-form-urlencoded"})

public @ResponseBody StudentRegistrationReply registerStudent(Student student)
{
		//@ResponseBody
		//public StudentRegistrationReply registerStudent(@RequestBody Student student) {
	System.out.println("In registerStudent");
    StudentRegistrationReply stdregreply = new StudentRegistrationReply();           
    StudentRegistration.getInstance().add(student);
    //We are setting the below value just to reply a message back to the caller
    stdregreply.setName(student.getName());
    stdregreply.setAge(student.getAge());
    stdregreply.setRegistrationNumber(student.getRegistrationNumber());
    stdregreply.setRegistrationStatus("Successful");
    
   
    
   /* 
    JSONObject std_details = new JSONObject();
    std_details.put("name",student.getName());
    std_details.put("age",student.getAge());
    std_details.put("registrationNumber",student.getRegistrationNumber());
    
    
    JSONArray std_jsonarray=new JSONArray();
    std_jsonarray.add(file_data);
    std_jsonarray.add(std_details);
 
    */
    
JSONArray obj;
JSONParser parser = new JSONParser();
try
{
FileReader rd=new FileReader("C:/java-json/StudentData.json");
obj = (JSONArray)parser.parse(rd);
} 
catch (Exception e) 
{
e.printStackTrace();
obj= new JSONArray();
} 
    
try
  	{
	FileWriter fw=new FileWriter("C:/java-json/StudentData.json",false);    
	ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	String json = ow.writeValueAsString(student);
	
	
    Map m = new LinkedHashMap(3);
    m.put("name", student.getName());
    m.put("age", student.getAge());
    m.put("registrationNumber", student.getRegistrationNumber());
    obj.add(m);
	
    
	fw.write(obj.toJSONString());
	fw.close();  	
	System.out.println("file created");
	} 
catch (IOException e) 
	{
	System.out.println("file NOT  created");
    e.printStackTrace();
	}
return stdregreply;
}

}
