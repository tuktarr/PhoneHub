package com.tuktarr.phonehub.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tuktarr.phonehub.news.NewsService;

@Controller
public class IndexController {
	
	@Autowired
	private NewsService nService;

	@RequestMapping("/")
	public String index() {
		nService.insNews();
		
		return "index";
	}

}
