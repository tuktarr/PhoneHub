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
		int sIdx = (param.getpPage() - 1) * param.getpRowContent();
		param.setsIdx(sIdx);
		searchData.put("phoneInfo", iMapper.selPhoneInfo(param));
		sIdx = (param.getnPage() - 1) * param.getnRowContent();
		param.setsIdx(sIdx);
		searchData.put("news", iMapper.selNews(param));
		sIdx = (param.getbPage() - 1) * param.getbRowContent();
		param.setsIdx(sIdx);
		searchData.put("post", iMapper.selBoard(param));
		
		return searchData;
	}
	
}
