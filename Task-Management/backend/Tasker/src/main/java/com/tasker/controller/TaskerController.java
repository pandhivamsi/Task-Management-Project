package com.tasker.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tasker.entity.Card;
import com.tasker.entity.Comment;
import com.tasker.entity.Person;
import com.tasker.entity.Project;
import com.tasker.security.JwtUtil;
import com.tasker.service.StorageService;
import com.tasker.service.TaskerService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class TaskerController {
	
	@Autowired
	private TaskerService service;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtil jwtUtil; 
	
	@Autowired
	private StorageService storageService;
	
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
	public List<Comment> getComments(@RequestParam(required = false) Integer cardId) {
	    if (cardId != null) {
	        return service.getCommentsByCardId(cardId);
	    }
	    return service.getAllComments();
	}

	
	@PostMapping("/comments")
	public ResponseEntity<Comment> addComment(@RequestBody Comment req) {
		req = service.saveComment(req);
		return ResponseEntity.status(HttpStatus.CREATED).body(req);

	}
	
	@PostMapping
	public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
	    String email = payload.get("username");
	    String password = payload.get("password");

	    Person user = service.findByEmail(email);
	    if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	    }

	    String token = jwtUtil.generateToken(email);

	    Map<String, Object> res = new HashMap<>();
	    res.put("token", token);
	    res.put("isLoggedIn", true);
	    res.put("id", user.getId());
	    res.put("role", user.getRole());
	    res.put("username", user.getEmail());

	    return ResponseEntity.ok(res);
	}
	
	@PostMapping("/register")
	public ResponseEntity<Person> addUser(@RequestBody Map<String, String> payload) {
	    Person p = new Person();
	    p.setEmail(payload.get("username")); 
	    p.setRole(payload.get("role"));
	    p.setName("Sample Name");
	    p.setPassword(passwordEncoder.encode(payload.get("password")));

	    p = service.addPerson(p);

	    return ResponseEntity.status(HttpStatus.CREATED).body(p);
	}

    // Reset password
    @PatchMapping("/resetPassword")
    public ResponseEntity<Void> resetPassword(@RequestBody String newPass) {
        Person p = service.getCurrentPerson(); // currently authenticated user
        service.updatePassword(p, passwordEncoder.encode(newPass));
        return ResponseEntity.ok().build();
    }
	@GetMapping("/peoples")
	public List<Person> getUsers(){
		return service.getAllPersons();
	}
	
	@GetMapping("/people/{id}")
	public Optional<Person> getUser(@PathVariable Integer id)
	{
		return service.getPerson(id);
	}
	
	@PutMapping("/peoples/{id}")
	public ResponseEntity<Person> updateUser(
	        @PathVariable Integer id,
	        @RequestParam(required = false) String name,
	        @RequestParam(required = false) String title,
	        @RequestParam(required = false) String organization,
	        @RequestParam(required = false) Long workPhone,
	        @RequestParam(required = false) Long mobile,
	        @RequestParam(required = false) String email,
	        @RequestParam(required = false) MultipartFile photo
	) {
	    Person person = service.getPerson(id)
	                           .orElseThrow(() -> new RuntimeException("Person not found"));

	    if (name != null) person.setName(name);
	    if (title != null) person.setTitle(title);
	    if (organization != null) person.setOrganization(organization);
	    if (workPhone != null) person.setWorkPhone(workPhone);
	    if (mobile != null) person.setMobile(mobile);
	    if (email != null) person.setEmail(email);

	    if (photo != null && !photo.isEmpty()) {
	        try {
	        	if (person.getProfileImg() != null) {
	                Path oldFile = Paths.get("C:/TaskerImages").resolve(person.getProfileImg());
	                Files.deleteIfExists(oldFile);
	            }
	            String fileName = storageService.save(photo);
	            person.setProfileImg(fileName);
	        } catch (IOException e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }

	    service.updatePerson(id, person);
	    return ResponseEntity.ok(person);
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
