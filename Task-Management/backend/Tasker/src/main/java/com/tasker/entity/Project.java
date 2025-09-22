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
	private Integer Id;
	
	@Column(name = "proj_name")
	private String projName;
	
	@Column(name = "created_by")
	private String createdBy;
	
	public Project() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Project(Integer id, String projName, String createdBy) {
		super();
		Id = id;
		this.projName = projName;
		this.createdBy = createdBy;
	}
	public Integer getId() {
		return Id;
	}
	public void setId(Integer id) {
		Id = id;
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
	@Override
	public String toString() {
		return "Project [Id=" + Id + ", projName=" + projName + ", createdBy=" + createdBy + "]";
	}

}
