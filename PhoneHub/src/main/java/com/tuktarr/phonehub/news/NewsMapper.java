package com.tuktarr.phonehub.news;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.NewsEntity;

@Mapper
public interface NewsMapper {
	public String selLastTitle();
	public int insNews(NewsEntity data);
	public int selMaxPageNum();
}
