package com.tuktarr.phonehub.phone;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.PhoneInfoEntity;

@Service
public class PhoneService {
	
	@Autowired
	private PhoneMapper pMapper;
	
	public List<PhoneInfoEntity> selPerformanceRanking() {
		return pMapper.selPerformanceRanking();
	}
	
	public List<PhoneInfoEntity> selCost_Effectiveness() {
		return pMapper.selCost_Effectiveness();
	}
	
	public PhoneInfoEntity selPhoneInfo() {
		return pMapper.selPhoneDetail();
	}
	
}
