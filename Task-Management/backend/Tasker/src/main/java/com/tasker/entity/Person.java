package com.tasker.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "peoples")
@Data
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;   // Primary key

    @Column(nullable = false)
    private String name;

    @Column(name = "title")
    private String title;

    private String organization;

    @Column(name = "work_phone")
    private Long workPhone;

    private Long mobile;
    
    private String status;
    
    private String role;

    @Column(unique = true) 
    private String email;

    private String password;

    @Column(name = "user_id", unique = true)
    private String userId;

    @Column(name = "profile_img")
    private String profileImg;  
}
