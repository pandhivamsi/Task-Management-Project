package com.tasker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasker.entity.Card;
import com.tasker.entity.Project;
import com.tasker.repo.CardsRepo;
import com.tasker.repo.ProjectRepo;

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
	
	public List<Card> getAllCards() {
		return crepo.findAll();
	}

	public Card addCard(Card c) {
	    return crepo.save(c);
	}

}
