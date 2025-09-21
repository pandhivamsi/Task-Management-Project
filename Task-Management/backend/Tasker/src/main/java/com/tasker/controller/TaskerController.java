package com.tasker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasker.entity.Project;
import com.tasker.service.TaskerService;


@RestController
public class TaskerController {
	
	@Autowired
	private TaskerService service;
	
	@GetMapping("/projects")
	public List<Project> getProjects() {
		return service.getAllProjects();
	}
	

}
