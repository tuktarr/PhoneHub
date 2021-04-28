package com.tuktarr.phonehub.Board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {
	@GetMapping("/board")
	public String board() {
		return "board/board";
	}
	
	@GetMapping("/detail")
	public String detail() {
		return "board/detail";
	}
}
