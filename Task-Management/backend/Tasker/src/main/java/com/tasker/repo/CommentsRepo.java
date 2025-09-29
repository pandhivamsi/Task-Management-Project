package com.tasker.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tasker.entity.Comment;

@Repository
public interface CommentsRepo extends JpaRepository<Comment, Integer> {

}
