package com.tuktarr.phonehub.model;

public class PhoneInfoDTO {
	private int pk;
	private String brand;
	private String phone;
	private String bodyWeight;
	private String bodySIM;
	private String commsBluetooth;
	private String commsUSB;
	
	public int getPk() {
		return pk;
	}
	public void setPk(int pk) {
		this.pk = pk;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getBodyWeight() {
		return bodyWeight;
	}
	public void setBodyWeight(String bodyWeight) {
		this.bodyWeight = bodyWeight;
	}
	public String getBodySIM() {
		return bodySIM;
	}
	public void setBodySIM(String bodySIM) {
		this.bodySIM = bodySIM;
	}
	public String getCommsBluetooth() {
		return commsBluetooth;
	}
	public void setCommsBluetooth(String commsBluetooth) {
		this.commsBluetooth = commsBluetooth;
	}
	public String getCommsUSB() {
		return commsUSB;
	}
	public void setCommsUSB(String commsUSB) {
		this.commsUSB = commsUSB;
	}
	
}
