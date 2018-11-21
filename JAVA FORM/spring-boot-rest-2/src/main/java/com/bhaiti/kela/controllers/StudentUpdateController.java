package com.bhaiti.kela.controllers;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.bhaiti.kela.beans.Student;
import com.bhaiti.kela.beans.StudentRegistration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
@Controller
public class StudentUpdateController {
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(method = RequestMethod.PUT, value="/update/student/{regdNum}",produces = {"application/json", "application/xml"},consumes = {"application/x-www-form-urlencoded"})
@ResponseBody
public JSONArray updateStudentRecord(Student student,@PathVariable("regdNum") String regdNum) {
System.out.println("In updateStudentRecord");
int id_rem=Integer.parseInt(regdNum);
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

obj.remove(id_rem);

JSONObject addobj=new JSONObject();
//obj.put(student.getName());
addobj.put("name", student.getName());
addobj.put("age", student.getAge());
addobj.put("registrationNumber", student.getRegistrationNumber());

obj.add(id_rem,addobj);

try
	{
	FileWriter fw=new FileWriter("C:/java-json/StudentData.json",false);    
	ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	
	fw.write(obj.toJSONString());
	fw.close();  	
	System.out.println("file created");
	} 
	catch (IOException e) 
	{
	System.out.println("file NOT  created");
  e.printStackTrace();
	}

return obj;

//return StudentRegistration.getInstance().upDateStudent(stdn);
}
}