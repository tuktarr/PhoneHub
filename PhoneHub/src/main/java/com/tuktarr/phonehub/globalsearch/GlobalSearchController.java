package com.tuktarr.phonehub.globalsearch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.BoardEntity;
import com.tuktarr.phonehub.model.GlobalSearchDTO;
import com.tuktarr.phonehub.model.NewsEntity;
import com.tuktarr.phonehub.model.PhoneInfoEntity;

@Controller
public class GlobalSearchController {
	
	@Autowired
	private GlobalSearchService gSService;
	
	@GetMapping("/searchHub")
	public String searchHub(GlobalSearchDTO param, Model model) {
		model.addAttribute("searchContents", param.getSearchKeyword());
		
		return "search/searchHub";
	}
	
	@GetMapping("/global-search-phone")
	@ResponseBody
	public List<PhoneInfoEntity> selPhoneInfo(GlobalSearchDTO param){
		
		return gSService.selPhoneInfo(param);
	}
	
	@GetMapping("/global-search-news")
	@ResponseBody
	public List<NewsEntity> selNews(GlobalSearchDTO param){
		
		return gSService.selNews(param);
	}
	
	@GetMapping("/global-search-board")
	@ResponseBody
	public List<BoardEntity> selBoard(GlobalSearchDTO param){
		
		return gSService.selBoard(param);
	}
	
}
