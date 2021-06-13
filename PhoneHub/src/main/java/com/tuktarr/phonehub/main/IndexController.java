package com.tuktarr.phonehub.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.tuktarr.phonehub.model.GlobalSearchDTO;

@Controller
public class IndexController {
	
	@Autowired
	private IndexService iService;

	@GetMapping("/index")
	public void index() {}
	
	@GetMapping("/searchHub")
	public String searchHub(GlobalSearchDTO param, Model model) {
		model.addAttribute("data", iService.selGlobalSearchDTO(param));
		model.addAttribute("searchContents", param.getSearchKeyword());
		
		return "search/searchHub";
	}
	
}
