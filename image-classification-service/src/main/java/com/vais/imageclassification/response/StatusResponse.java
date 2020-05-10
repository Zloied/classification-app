package com.vais.imageclassification.response;

public enum StatusResponse {

	SUCCESS("Success"), ERROR("Error");
	final private String status;

	private StatusResponse(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

}
