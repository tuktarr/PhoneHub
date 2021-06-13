package com.tuktarr.phonehub.model;

public class GlobalSearchDTO {
	private String searchKeyword;
	private int sIdx;
	private int page;
	private int rowContent;

	public String getSearchKeyword() {
		return searchKeyword;
	}
	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}
	public int getsIdx() {
		return sIdx;
	}
	public void setsIdx(int sIdx) {
		this.sIdx = sIdx;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getRowContent() {
		return rowContent;
	}
	public void setRowContent(int rowContent) {
		this.rowContent = rowContent;
	}
	
}
