package com.tuktarr.phonehub.model;

public class BoardDTO {
	private int boardPk;
	private int userPk;
	private int page;
	private int sIdx;
	private int rowCnt;
	private int category;
	private int likecount;
	private int hatecount;

	public int getLikecount() {
		return likecount;
	}
	public void setLikecount(int likecount) {
		this.likecount = likecount;
	}
	public int getHatecount() {
		return hatecount;
	}
	public void setHatecount(int hatecount) {
		this.hatecount = hatecount;
	}
	public int getBoardPk() {
		return boardPk;
	}
	public void setBoardPk(int boardPk) {
		this.boardPk = boardPk;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getsIdx() {
		return sIdx;
	}
	public void setsIdx(int sIdx) {
		this.sIdx = sIdx;
	}
	public int getRowCnt() {
		return rowCnt;
	}
	public void setRowCnt(int rowCnt) {
		this.rowCnt = rowCnt;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public int getUserPk() {
		return userPk;
	}
	public void setUserPk(int userPk) {
		this.userPk = userPk;
	}
	
	
}
