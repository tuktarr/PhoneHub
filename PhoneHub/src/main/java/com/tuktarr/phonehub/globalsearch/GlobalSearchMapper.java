package com.tuktarr.phonehub.globalsearch;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.BoardEntity;
import com.tuktarr.phonehub.model.GlobalSearchDTO;
import com.tuktarr.phonehub.model.NewsEntity;
import com.tuktarr.phonehub.model.PhoneInfoEntity;

@Mapper
public interface GlobalSearchMapper {
	List<PhoneInfoEntity> selPhoneInfo(GlobalSearchDTO param);
	List<NewsEntity> selNews(GlobalSearchDTO param);
	List<BoardEntity> selBoard(GlobalSearchDTO param);
}
