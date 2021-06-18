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
	
	public List<PhoneInfoEntity> selPhoneInfo(GlobalSearchDTO param){
		param.setRowContent(8);
		int sIdx = (param.getPage() - 1) * param.getRowContent();
		param.setsIdx(sIdx);
		return gSMapper.selPhoneInfo(param);
	}
	
	public List<NewsEntity> selNews(GlobalSearchDTO param){
		param.setRowContent(8);
		int sIdx = (param.getPage() - 1) * param.getRowContent();
		param.setsIdx(sIdx);
		return gSMapper.selNews(param);
	}
	
	public List<BoardEntity> selBoard(GlobalSearchDTO param){
		param.setRowContent(5);
		int sIdx = (param.getPage() - 1) * param.getRowContent();
		param.setsIdx(sIdx);
		return gSMapper.selBoard(param);
	}
	
	public int phoneSearchCount(GlobalSearchDTO param) {
		param.setRowContent(8);
		return gSMapper.phoneSearchCount(param);
	}
	
	public int newsSearchCount(GlobalSearchDTO param) {
		param.setRowContent(8);
		return gSMapper.newsSearchCount(param);
	}
	
	public int boardSearchCount(GlobalSearchDTO param) {
		param.setRowContent(5);
		return gSMapper.boardSearchCount(param);
	}
	
	public int selPhoneMaxPageNum(GlobalSearchDTO param) {
		param.setRowContent(8);
		return gSMapper.selPhoneMaxPageNum(param);
	}
	
	public int selNewsMaxPageNum(GlobalSearchDTO param) {
		param.setRowContent(8);
		return gSMapper.selNewsMaxPageNum(param);
	}
	
	public int selBoardMaxPageNum(GlobalSearchDTO param) {
		param.setRowContent(5);
		return gSMapper.selBoardMaxPageNum(param);
	}
	
}
