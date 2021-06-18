package com.tuktarr.phonehub.phone;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.PhoneInfoDTO;
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
	
	public int selMaxPageNum(PhoneInfoDTO param) {
		return pMapper.selMaxPageNum(param);
	}
	
	public List<PhoneInfoEntity> selSearchPhone(PhoneInfoDTO param) {
		int sIdx = (param.getPage() - 1) * param.getRowContent();
		param.setsIdx(sIdx);
		return pMapper.selSearchPhone(param);
	}
	
	public PhoneInfoEntity selPhoneDetail(PhoneInfoDTO param) {
		
		PhoneInfoEntity pData = new PhoneInfoEntity();
		pData.setPk(param.getPk());
		
		return pMapper.selPhoneDetail(pData);
	}
	
	public String selUsableTip() {
		
		return pMapper.selUsableTip();
	}
	
	public int selPhoneNameSearch(PhoneInfoDTO param) {
		
		return pMapper.selPhoneNameSearch(param);
	}
	
	public List<String> selPhoneNameList() {
		
		return pMapper.selPhoneNameList();
	}
	
}
