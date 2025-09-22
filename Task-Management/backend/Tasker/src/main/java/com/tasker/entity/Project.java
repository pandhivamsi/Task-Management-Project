package com.tasker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.Id;

@Entity
@Table(name = "projects",schema = "tasker")
@Data
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "proj_name")
	private String projName;
	
	@Column(name = "created_by")
	private String createdBy;

	@Override
	public String toString() {
		return "Project [id=" + id + ", projName=" + projName + ", createdBy=" + createdBy + "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProjName() {
		return projName;
	}

	public void setProjName(String projName) {
		this.projName = projName;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Project(Integer id, String projName, String createdBy) {
		super();
		this.id = id;
		this.projName = projName;
		this.createdBy = createdBy;
	}

	public Project() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
