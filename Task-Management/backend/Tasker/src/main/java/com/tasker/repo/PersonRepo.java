package com.tasker.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasker.entity.Person;

import jakarta.persistence.Entity;


@Entity
public interface PersonRepo extends JpaRepository<Person, Integer> {

	public Optional<Person> findByEmail(String email);
	Optional<Person> findByUserid(String userid);
}
