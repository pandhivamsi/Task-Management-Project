package com.tasker.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasker.entity.Card;
import com.tasker.entity.Project;
import com.tasker.service.TaskerService;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TaskerController {
	
	@Autowired
	private TaskerService service;
	
	@GetMapping("/projects")
	public List<Project> getProjects() {
		return service.getAllProjects();
	}
	
	@PostMapping("/projects")
	public ResponseEntity<Project> createProject(@RequestBody Project req) {
		req = service.saveProject(req);
		return ResponseEntity.status(HttpStatus.CREATED).body(req);

	}
	
	@GetMapping("/cards")
	public List<Card> getCards() {
		return service.getAllCards();
	}
	
	@PostMapping("/cards")
	public ResponseEntity<Card> addCard(@RequestBody Card req) {
		req = service.addCard(req);
		return ResponseEntity.status(HttpStatus.CREATED).body(req);

	}
}
