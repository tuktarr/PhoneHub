package com.tuktarr.phonehub.news;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.NewsEntity;
import com.tuktarr.phonehub.utils.NaverNewsCrawling;

@Service
public class NewsService {
	
	@Autowired
	private NewsMapper nMapper;
	
	@Autowired
	private NaverNewsCrawling nnc;
	
	public int insNews() {
		String title = nMapper.selLastTitle();
		if(title == null) {
			title = "";
		}
		NewsEntity news = new NewsEntity();
		List<NewsEntity> data = new ArrayList<NewsEntity>();
		int result = 0;
		
		try {
			data = nnc.naverNewsCrawling(title);
			for(int i = data.size() - 1; i >= 0; i--) {
				news.setTitle(data.get(i).getTitle());
				news.setContent(data.get(i).getContent());
				news.setWriter(data.get(i).getWriter());
				news.setImg(data.get(i).getImg());
				news.setUrl(data.get(i).getUrl());
				news.setRegDt(data.get(i).getRegDt());
				result = nMapper.insNews(news);
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
}
