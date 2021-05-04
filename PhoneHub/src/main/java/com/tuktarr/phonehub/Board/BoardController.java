package com.tuktarr.phonehub.Board;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.BoardEntity;
import com.tuktarr.phonehub.utils.SecurityUtils;

@Controller
public class BoardController {
	
	@Autowired
	SecurityUtils sUtils;
	
	@Autowired
	BoardService bService;
	
	@GetMapping("/list")
	public String list() {
		return "board/list";
	}
	
	@GetMapping("/write")
	public String writeEdit() {
		return "board/write";
	}
	
	@PostMapping("/write")
	@ResponseBody
	public Map<String, Object> writeEdit(@RequestBody BoardEntity p) {
		Map<String, Object> map = new HashMap<>();
		map.put("result", bService.insBoard(p));
		return map;
	}
	
	@GetMapping("/detail")
	public String detail(BoardEntity p, Model model, HttpSession hs) {
		model.addAttribute("data", bService.selBoardDetail(p, hs));
		return "board/detail";
	}
	
	@GetMapping("/edit")
	public String edit(BoardEntity p, Model model) {
		model.addAttribute("data", bService.selBoard(p));
		return "board/write";
	}

	@PostMapping("/edit")
	@ResponseBody
	public Map<String, Object> edit(@RequestBody BoardEntity p, HttpSession hs) {
		p.setUserPk(sUtils.getLoginUserPk(hs));
		
		Map<String, Object> map = new HashMap<>();
		map.put("result", bService.upBoard(p));
		return map;
	}
	// delete ajax처리
	@ResponseBody
	@DeleteMapping("/del/{boardPk}")
	public Map<String, Object> delBoard(BoardEntity p, HttpSession hs) {

		p.setUserPk(sUtils.getLoginUserPk(hs));

		Map<String, Object> map = new HashMap<>();
		map.put("data", bService.delBoard(p));
		return map;
		
	}
}
