package com.tasker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="comments")
@Data
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Integer id;
	
	@Column(name = "comment")
	private String comment;
	
	@Column(name = "card_name")
	private String cardName;
	
	@Column(name="card_id")
	private Integer cardId;
	
	@Column(name ="comment_by")
	private String commentedBy;

}
