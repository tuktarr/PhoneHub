package com.tuktarr.phonehub.news;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.NewsDTO;
import com.tuktarr.phonehub.model.NewsEntity;

@Controller
public class NewsController {
	
	@Autowired
	private NewsService nService;
	
	@GetMapping("/news")
	public String index() {
		nService.insNews();
		
		return "news/news";
	}
	
	@ResponseBody
	@GetMapping("/getMaxNewsPageNum")
	public int selMaxPageNum(NewsDTO param) {
		return nService.selMaxPageNum(param);
	}
	
	@ResponseBody
	@GetMapping("/newsListData")
	public List<NewsEntity> sellistData(NewsDTO param) {
		return nService.selNewsList(param);
	}
	
	@ResponseBody
	@GetMapping("/selPopularNews")
	public List<NewsEntity> selPopularNews(NewsDTO param) {
		return nService.selPopularNews(param);
	}
	
	@ResponseBody
	@GetMapping("/updNewsHits{pk}")
	public int updNewsHits(NewsDTO param) {
		return nService.updNewsHits(param);
	}
	
}
