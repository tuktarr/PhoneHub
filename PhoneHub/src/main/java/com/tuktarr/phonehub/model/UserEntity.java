package com.tuktarr.phonehub.model;

public class UserEntity {
	private int userPk;
	private String userEmail;
	private String userPw;
	private String userPwRe;
	private String nickname;
	private String regDt;
	private String gender;
	private String birthday;
	private String phone;
	private int emailChk;
	
	public int getEmailChk() {
		return emailChk;
	}
	public void setEmailChk(int emailChk) {
		this.emailChk = emailChk;
	}
	public int getUserPk() {
		return userPk;
	}
	public void setUserPk(int userPk) {
		this.userPk = userPk;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserPw() {
		return userPw;
	}
	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}
	public String getUserPwRe() {
		return userPwRe;
	}
	public void setUserPwRe(String userPwRe) {
		this.userPwRe = userPwRe;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getRegDt() {
		return regDt;
	}
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
