package com.tuktarr.phonehub.main;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.GlobalSearchDTO;

@Service
public class IndexService {
	
	@Autowired
	private IndexMapper iMapper;
	
	public Map<String, Object> selGlobalSearchDTO(GlobalSearchDTO param) {
		Map<String, Object> searchData = new HashMap<String, Object>();
		searchData.put("phoneInfo", iMapper.selPhoneInfo(param));
		searchData.put("news", iMapper.selNews(param));
		searchData.put("post", iMapper.selBoard(param));
		
		return searchData;
	}
	
}
