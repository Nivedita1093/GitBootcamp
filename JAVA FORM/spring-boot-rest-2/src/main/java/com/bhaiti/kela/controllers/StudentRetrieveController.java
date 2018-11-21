package com.bhaiti.kela.controllers;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.bhaiti.kela.beans.Student;
import com.bhaiti.kela.beans.StudentRegistration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
@Controller
public class StudentRetrieveController {
  @CrossOrigin(origins = "http://localhost:8080")
  @RequestMapping(method = RequestMethod.GET, value="/student/allstudent")
  @ResponseBody
  public List<Student> getAllStudents() {
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
	  return object;
	  
//  return StudentRegistration.getInstance().getStudentRecords();
  
  }
  

  
  
  
  
  @CrossOrigin(origins = "http://localhost:8080")
  @RequestMapping(method = RequestMethod.GET, value="/student/allstudent/{id}")
  @ResponseBody
  public Object getOneStudent(@PathVariable("id") String id) {
	JSONArray object;
	Object std;
	JSONParser parser = new JSONParser();
	  try
	  	{
		 FileReader rt=new FileReader("C:/java-json/StudentData.json");
		 object = (JSONArray)parser.parse(rt);
		 std=(Object) object.get(Integer.parseInt(id));
		
		} 
	catch (Exception e) 
		{
	    e.printStackTrace();
	    object= new JSONArray();
	    std=new Object();
		}
	return std;
	  
//  return StudentRegistration.getInstance().getStudentRecords();
  
  }
  



} 