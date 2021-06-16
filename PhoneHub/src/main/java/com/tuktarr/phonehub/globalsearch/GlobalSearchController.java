package com.tuktarr.phonehub.globalsearch;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.GlobalSearchDTO;

@Controller
public class GlobalSearchController {
	
	@Autowired
	private GlobalSearchService gSService;
	
	@GetMapping("/searchHub")
	public String searchHub(GlobalSearchDTO param, Model model) {
		model.addAttribute("searchContents", param.getSearchKeyword());
		model.addAttribute("phoneSearchCount", gSService.phoneSearchCount(param));
		model.addAttribute("newsSearchCount", gSService.newsSearchCount(param));
		model.addAttribute("boardSearchCount", gSService.boardSearchCount(param));
		
		return "search/searchHub";
	}
	
	@GetMapping("/global-search-phone")
	@ResponseBody
	public Map<String, Object> selPhoneInfo(GlobalSearchDTO param){
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("data", gSService.selPhoneInfo(param));
		data.put("maxPage", gSService.selPhoneMaxPageNum(param));
		
		return data;
	}
	
	@GetMapping("/global-search-news")
	@ResponseBody
	public Map<String, Object> selNews(GlobalSearchDTO param){
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("data", gSService.selNews(param));
		data.put("maxPage", gSService.selNewsMaxPageNum(param));
		
		return data;
	}
	
	@GetMapping("/global-search-board")
	@ResponseBody
	public Map<String, Object> selBoard(GlobalSearchDTO param){
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("data", gSService.selBoard(param));
		data.put("maxPage", gSService.selBoardMaxPageNum(param));
		
		return data;
	}
	
}
