package com.tasker.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class ProjectRequest {

	@Column(name = "proj_name")
	private String projName;
	
	@Column(name = "created_by")
	private String createdBy;

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
	
}
