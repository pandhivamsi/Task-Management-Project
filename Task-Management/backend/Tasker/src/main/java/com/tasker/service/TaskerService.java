package com.tasker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasker.entity.Card;
import com.tasker.entity.Project;
import com.tasker.repo.CardsRepo;
import com.tasker.repo.ProjectRepo;
import java.lang.reflect.Field;

@Service
public class TaskerService {
	
	@Autowired
	private ProjectRepo repo;
	
	@Autowired
	private CardsRepo crepo;
	
	public List<Project> getAllProjects() {
		return repo.findAll();
	}

	public Project saveProject(Project req) {
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

}
