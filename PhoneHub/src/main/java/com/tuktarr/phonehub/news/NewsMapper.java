package com.tuktarr.phonehub.news;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.NewsDTO;
import com.tuktarr.phonehub.model.NewsEntity;

@Mapper
public interface NewsMapper {
	public int insNews(NewsEntity data);
	public String selLastTitle();
	public int selMaxPageNum(NewsDTO param);
	public List<NewsEntity> selNewsList(NewsDTO param);
	public List<NewsEntity> selPopularNews(NewsDTO param);
	public int updNewsHits(NewsDTO param);
}
