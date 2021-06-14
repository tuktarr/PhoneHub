package com.tuktarr.phonehub.model;

public class GlobalSearchDTO {
	private String searchKeyword;
	private int sIdx;
	private int pPage;
	private int nPage;
	private int bPage;
	private int pRowContent;
	private int nRowContent;
	private int bRowContent;
	
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
	public int getpPage() {
		return pPage;
	}
	public void setpPage(int pPage) {
		this.pPage = pPage;
	}
	public int getnPage() {
		return nPage;
	}
	public void setnPage(int nPage) {
		this.nPage = nPage;
	}
	public int getbPage() {
		return bPage;
	}
	public void setbPage(int bPage) {
		this.bPage = bPage;
	}
	public int getpRowContent() {
		return pRowContent;
	}
	public void setpRowContent(int pRowContent) {
		this.pRowContent = pRowContent;
	}
	public int getnRowContent() {
		return nRowContent;
	}
	public void setnRowContent(int nRowContent) {
		this.nRowContent = nRowContent;
	}
	public int getbRowContent() {
		return bRowContent;
	}
	public void setbRowContent(int bRowContent) {
		this.bRowContent = bRowContent;
	}

}
