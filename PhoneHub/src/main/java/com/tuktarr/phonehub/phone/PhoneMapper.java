package com.tuktarr.phonehub.phone;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.PhoneInfoEntity;

@Mapper
public interface PhoneMapper {
	List<PhoneInfoEntity> selPerformanceRanking();
	List<PhoneInfoEntity> selCost_Effectiveness();
	PhoneInfoEntity selPhoneDetail(PhoneInfoEntity param);
	String selUsebleTip();
}
