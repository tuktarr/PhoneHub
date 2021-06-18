package com.tuktarr.phonehub.phone;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.PhoneInfoDTO;
import com.tuktarr.phonehub.model.PhoneInfoEntity;

@Mapper
public interface PhoneMapper {
	List<PhoneInfoEntity> selPerformanceRanking();
	List<PhoneInfoEntity> selCost_Effectiveness();
	int selMaxPageNum(PhoneInfoDTO param);
	List<PhoneInfoEntity> selSearchPhone(PhoneInfoDTO param);
	PhoneInfoEntity selPhoneDetail(PhoneInfoEntity param);
	String selUsableTip();
	int selPhoneNameSearch(PhoneInfoDTO param);
	List<String> selPhoneNameList();
}
