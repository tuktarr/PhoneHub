package com.tuktarr.phonehub.model;

public class CommentEntity {
	private int cmtPk;
	private int boardPk;
	private int depth;
	private String ctnt;
	private int groupCmt;
	private int userPk;
	private String regDt;
	private String modDt;
	private int isDel;
	private int cmtCount;
	private String nickname;
	
	public int getCmtPk() {
		return cmtPk;
	}
	public void setCmtPk(int cmtPk) {
		this.cmtPk = cmtPk;
	}
	public int getCmtCount() {
		return cmtCount;
	}
	public void setCmtCount(int cmtCount) {
		this.cmtCount = cmtCount;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickName(String nickName) {
		this.nickname = nickName;
	}
	public int getBoardPk() {
		return boardPk;
	}
	public void setBoardPk(int boardPk) {
		this.boardPk = boardPk;
	}
	public int getDepth() {
		return depth;
	}
	public void setDepth(int depth) {
		this.depth = depth;
	}
	public String getCtnt() {
		return ctnt;
	}
	public void setCtnt(String ctnt) {
		this.ctnt = ctnt;
	}
	public int getGroupCmt() {
		return groupCmt;
	}
	public void setGroupCmt(int groupCmt) {
		this.groupCmt = groupCmt;
	}
	public int getUserPk() {
		return userPk;
	}
	public void setUserPk(int userPk) {
		this.userPk = userPk;
	}
	public String getRegDt() {
		return regDt;
	}
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}
	public String getModDt() {
		return modDt;
	}
	public void setModDt(String modDt) {
		this.modDt = modDt;
	}
	public int getIsDel() {
		return isDel;
	}
	public void setIsDel(int isDel) {
		this.isDel = isDel;
	}
	
}
