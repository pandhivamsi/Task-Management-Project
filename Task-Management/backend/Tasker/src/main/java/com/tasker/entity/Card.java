package com.tasker.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "cards")
@Data
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "priority")
    private String priority;  

    @Column(name = "status")
    private String status; 

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "estimate_date")
    private LocalDate estimateDate;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "person_name")
    private String personName;

    @Column(name = "size")
    private String size; 

    @Column(name = "sprint")
    private String sprint;

    @Column(name = "release_version")
    private String release;
    
}
