package com.tuktarr.phonehub.globalsearch;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.BoardEntity;
import com.tuktarr.phonehub.model.GlobalSearchDTO;
import com.tuktarr.phonehub.model.NewsEntity;
import com.tuktarr.phonehub.model.PhoneInfoEntity;

@Mapper
public interface GlobalSearchMapper {
	public List<PhoneInfoEntity> selPhoneInfo(GlobalSearchDTO param);
	public List<NewsEntity> selNews(GlobalSearchDTO param);
	public List<BoardEntity> selBoard(GlobalSearchDTO param);
	public int phoneSearchCount(GlobalSearchDTO param);
	public int newsSearchCount(GlobalSearchDTO param);
	public int boardSearchCount(GlobalSearchDTO param);
	public int selPhoneMaxPageNum(GlobalSearchDTO param);
	public int selNewsMaxPageNum(GlobalSearchDTO param);
	public int selBoardMaxPageNum(GlobalSearchDTO param);
}
