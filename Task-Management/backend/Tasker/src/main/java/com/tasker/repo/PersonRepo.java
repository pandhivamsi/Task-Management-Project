package com.tasker.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tasker.entity.Person;


@Repository
public interface PersonRepo extends JpaRepository<Person, Integer> {

	public Optional<Person> findByEmail(String email);
	Optional<Person> findByUserId(String userId);
}
