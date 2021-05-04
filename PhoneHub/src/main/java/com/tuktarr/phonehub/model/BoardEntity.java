package com.tuktarr.phonehub.model;

public class BoardEntity {
	private int boardPk;
	private int seq;
	private String title;
	private String ctnt;
	private int hits;
	private int userPk;
	private String regDt;
	private String modDt;
	private String img;
	private int isDel;
	private int voted_count;
	private int blamed_count;
	private int category;
	
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public int getBoardPk() {
		return boardPk;
	}
	public void setBoardPk(int boardPk) {
		this.boardPk = boardPk;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCtnt() {
		return ctnt;
	}
	public void setCtnt(String ctnt) {
		this.ctnt = ctnt;
	}
	public int getHits() {
		return hits;
	}
	public void setHits(int hits) {
		this.hits = hits;
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
	public int getVoted_count() {
		return voted_count;
	}
	public void setVoted_count(int voted_count) {
		this.voted_count = voted_count;
	}
	public int getBlamed_count() {
		return blamed_count;
	}
	public void setBlamed_count(int blamed_count) {
		this.blamed_count = blamed_count;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	
}
