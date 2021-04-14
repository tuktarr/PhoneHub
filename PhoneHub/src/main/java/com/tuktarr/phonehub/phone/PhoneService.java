package com.tuktarr.phonehub.phone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhoneService {
	
	@Autowired
	private PhoneMapper pMapper;
	
	public void selPhoneInfo() {
		pMapper.selPhoneInfo();
	}
	
}
