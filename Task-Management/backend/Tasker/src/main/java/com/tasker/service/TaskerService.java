package com.tasker.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.tasker.entity.Card;
import com.tasker.entity.Comment;
import com.tasker.entity.Person;
import com.tasker.entity.Project;
import com.tasker.repo.CardsRepo;
import com.tasker.repo.CommentsRepo;
import com.tasker.repo.PersonRepo;
import com.tasker.repo.ProjectRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class TaskerService {
	
	@Autowired
	private ProjectRepo repo;
	
	@Autowired
	private CardsRepo crepo;
	
	@Autowired
	@Lazy
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CommentsRepo ccrepo;
	
	@Autowired
	private PersonRepo prepo;
	
	public List<Project> getAllProjects() {
		return repo.findAll();
	}
	
	public Optional<Person> getPerson(Integer id)
	{
		return prepo.findById(id);
	}

	public Project saveProject(Project req) {
//		Person p=getCurrentPerson();
//		req.setCreatedBy(p.getName());
        return repo.save(req);
    }
	
	public Project updateProject(Integer id, Project newProjectData) {
	    return repo.findById(id)
	            .map(project -> {
	                project.setProjName(newProjectData.getProjName());
	                
	                project.setCreatedBy(newProjectData.getCreatedBy());
	                return repo.save(project);
	            })
	            .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
	}

	public void deleteProject(Integer id) {
	    if (!repo.existsById(id)) {
	        throw new RuntimeException("Project not found with id: " + id);
	    }
	    repo.deleteById(id);
	}
	
	public List<Card> getAllCards() {
		return crepo.findAll();
	}

	public Card addCard(Card c) {
	    return crepo.save(c);
	}
	
	public Card updateCard(Integer id, Card newCardData) {
	    return crepo.findById(id)
	        .map(card -> {
	            Field[] fields = Card.class.getDeclaredFields();
	            for (Field field : fields) {
	                field.setAccessible(true);
	                try {
	                    Object value = field.get(newCardData);
	                    if (value != null && !field.getName().equals("id")) {
	                        field.set(card, value);
	                    }
	                } catch (IllegalAccessException e) {
	                    e.printStackTrace();
	                }
	            }
	            return crepo.save(card);
	        })
	        .orElseThrow(() -> new RuntimeException("Card not found with id: " + id));
	}


	public void deleteCard(Integer id) {
	    if (!crepo.existsById(id)) {
	        throw new RuntimeException("Project not found with id: " + id);
	    }
	    crepo.deleteById(id);
	}
	
	public List<Comment> getAllComments() {
		return ccrepo.findAll();
	}

	public Comment saveComment(Comment req) {
        return ccrepo.save(req);
    }
	
	public List<Comment> getCommentsByCardId(Integer cardId) {
	    return ccrepo.findByCardId(cardId);
	}
	
	public List<Person> getAllPersons(){
		return prepo.findAll();
	}
	
	public Person addPerson(Person p)
	{
		return prepo.save(p);
	}
	
	public Person updatePerson(Integer id, Person p) {
	    return prepo.findById(id)
	        .map(person -> {
	            Field[] fields = Person.class.getDeclaredFields();
	            for (Field field : fields) {
	                field.setAccessible(true);
	                try {
	                    Object value = field.get(p);
	                    if (value != null && !field.getName().equals("id")) {
	                        field.set(person, value);
	                    }
	                } catch (IllegalAccessException e) {
	                    e.printStackTrace();
	                }
	            }
	            return prepo.save(person);
	        })
	        .orElseThrow(() -> new RuntimeException("Person not found with id: " + id));
	}
	
	public void deletePerson(Integer id) {
	    if (!prepo.existsById(id)) {
	        throw new RuntimeException("Person not found with id: " + id);
	    }
	    prepo.deleteById(id);
	}
	
	public Person getCurrentPerson() {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth == null || !auth.isAuthenticated()) {
	        throw new UsernameNotFoundException("No authenticated user");
	    }
	    String principalName = auth.getName();
	    return prepo.findByUserId(principalName)
	            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + principalName));
	}
	
	public void updatePassword(Person person, String rawPassword) {
	    person.setPassword(passwordEncoder.encode(rawPassword));
	    prepo.save(person);
	}
	
	public Boolean loginUser(String email, String password)
	{
		Optional<Person> user = prepo.findByEmail(email);

		if (user.isEmpty()) {
			return false;
		}
		Person user1 = user.get();
		return passwordEncoder.matches(password, user1.getPassword());		
	}
	
	public Person findByEmail(String email) {
	    return prepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
	} 

}
