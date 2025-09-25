package com.tasker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tasker.entity.Card;
import com.tasker.entity.Comment;
import com.tasker.entity.Person;
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
	
	@PutMapping("/projects/{id}")
	public ResponseEntity<Project> updateProject(
	        @PathVariable("id") Integer id,
	        @RequestBody Project newProjectData) {
	    Project updatedProject = service.updateProject(id, newProjectData);
	    return ResponseEntity.ok(updatedProject);
	}
	
	@DeleteMapping("/projects/{id}")
	public ResponseEntity<Void> deleteProject(@PathVariable Integer id) {
        try {
            service.deleteProject(id);
            return ResponseEntity.noContent().build(); 
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
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
	
	@PutMapping("/cards/{id}")
	public ResponseEntity<Card> updateCard(
	        @PathVariable("id") Integer id,
	        @RequestBody Card c1) {
	    Card c = service.updateCard(id, c1);
	    return ResponseEntity.ok(c);
	}
	
	@DeleteMapping("/cards/{id}")
	public ResponseEntity<Void> deleteCard(@PathVariable Integer id) {
        try {
            service.deleteCard(id);
            return ResponseEntity.noContent().build(); 
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
	
	@GetMapping("/comments")
	public List<Comment> getComments() {
		return service.getAllComments();
	}
	
	@PostMapping("/comments")
	public ResponseEntity<Comment> addComment(@RequestBody Comment req) {
		req = service.saveComment(req);
		return ResponseEntity.status(HttpStatus.CREATED).body(req);

	}
	
	@PostMapping("/")
	public Boolean loginUser(@RequestParam String userName ,@RequestParam String password) {
		return service.loginUser(userName,password);

	}
	
	@PostMapping("/register")
	public ResponseEntity<Person> addUser(@RequestBody Person p) {
		p = service.addPerson(p);
		return ResponseEntity.status(HttpStatus.CREATED).body(p);
	}
	
	@PatchMapping("/resetPassword")
	public ResponseEntity<Void> resetPassword(@RequestBody String newPass) {
	    Person p = service.getCurrentPerson();
	    service.updatePassword(p, newPass);  
	    return ResponseEntity.ok().build();
	}
	
	@GetMapping("/peoples")
	public List<Person> getUsers(){
		return service.getAllPersons();
	}
	
	@PutMapping("/peoples/{id}")
	public ResponseEntity<Person> updateUser(
	        @PathVariable("id") Integer id,
	        @RequestBody Person c1) {
	    Person c = service.updatePerson(id, c1);
	    return ResponseEntity.ok(c);
	}
	
	@DeleteMapping("/peoples/{id}")
	public ResponseEntity<Void> deletePerson(@PathVariable Integer id) {
        try {
            service.deletePerson(id);
            return ResponseEntity.noContent().build(); 
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
	
}
