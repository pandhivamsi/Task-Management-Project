package com.tasker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasker.entity.Project;
import com.tasker.repo.ProjectRepo;

@Service
public class TaskerService {
	
	@Autowired
	private ProjectRepo repo;
	
	public List<Project> getAllProjects() {
		return repo.findAll();
	}

}
