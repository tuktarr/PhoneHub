package com.tuktarr.phonehub.globalsearch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.BoardEntity;
import com.tuktarr.phonehub.model.GlobalSearchDTO;
import com.tuktarr.phonehub.model.NewsEntity;
import com.tuktarr.phonehub.model.PhoneInfoEntity;

@Service
public class GlobalSearchService {

	@Autowired
	private GlobalSearchMapper gSMapper;
	
	List<PhoneInfoEntity> selPhoneInfo(GlobalSearchDTO param){
		return gSMapper.selPhoneInfo(param);
	}
	
	List<NewsEntity> selNews(GlobalSearchDTO param){
		return gSMapper.selNews(param);
	}
	
	List<BoardEntity> selBoard(GlobalSearchDTO param){
		return gSMapper.selBoard(param);
	}
	
}
