package com.tuktarr.phonehub.news;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NewsController {
	
	@Autowired
	private NewsService nService;
	
	@GetMapping("/news")
	public String index() {
		nService.insNews();
		
		return "news/news";
	}
	
}
