package com.tuktarr.phonehub.model;

public class BoardDomain extends BoardEntity {
	private String writerNm;
	private String userProfile;
	
	public String getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(String userProfile) {
		this.userProfile = userProfile;
	}

	public String getWriterNm() {
		return writerNm;
	}

	public void setWriterNm(String writerNm) {
		this.writerNm = writerNm;
	}
	
}
