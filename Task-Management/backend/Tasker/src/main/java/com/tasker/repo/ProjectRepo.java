package com.tasker.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tasker.entity.Project;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Integer> {
		

}
