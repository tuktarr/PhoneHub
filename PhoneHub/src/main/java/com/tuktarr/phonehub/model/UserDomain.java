package com.tuktarr.phonehub.model;

public class UserDomain extends UserEntity{
	private String userNewPw;
	private String userNewEmail;
	private String newNickname;
	private String newGender;
	private String newBirthday;
	private String newPhone;
	
	public String getUserNewPw() {
		return userNewPw;
	}
	public void setUserNewPw(String userNewPw) {
		this.userNewPw = userNewPw;
	}
	public String getUserNewEmail() {
		return userNewEmail;
	}
	public void setUserNewEmail(String userNewEmail) {
		this.userNewEmail = userNewEmail;
	}
	public String getNewNickname() {
		return newNickname;
	}
	public void setNewNickname(String newNickname) {
		this.newNickname = newNickname;
	}
	public String getNewGender() {
		return newGender;
	}
	public void setNewGender(String newGender) {
		this.newGender = newGender;
	}
	public String getNewBirthday() {
		return newBirthday;
	}
	public void setNewBirthday(String newBirthday) {
		this.newBirthday = newBirthday;
	}
	public String getNewPhone() {
		return newPhone;
	}
	public void setNewPhone(String newPhone) {
		this.newPhone = newPhone;
	}
	
}
