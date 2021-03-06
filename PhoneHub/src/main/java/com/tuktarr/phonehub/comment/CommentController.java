package com.tuktarr.phonehub.comment;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.CommentEntity;
import com.tuktarr.phonehub.utils.SecurityUtils;

@Controller
public class CommentController {

	@Autowired
	CommentService cService;
	
	@Autowired
	SecurityUtils sUtils;
	
	//댓글 등록 DB로 보내기
	@PostMapping("/comment")
	@ResponseBody
	public Map<String, Object> insComment(@RequestBody CommentEntity p) {
		Map<String, Object> map = new HashMap<>();
		map.put("result", cService.insCmt(p));
		return map;
	}
	
	//댓글 리스트 받아오기
	@GetMapping("/comment")
	@ResponseBody
	public List<CommentEntity> selCmt(CommentEntity p) {
		return cService.selCmt(p);
	}
	
	// delete ajax처리
	@PostMapping("/del")
	@ResponseBody
	public int delCmt(@RequestBody CommentEntity p, HttpSession hs) {
		System.out.println("cmtPk :" + p.getCmtPk());
		System.out.println("userPk :" + p.getUserPk());
			return cService.delCmt(p,hs);				
	}
	
	@PostMapping("/ccmt")
	@ResponseBody
	public int insCmtGroup(@RequestBody CommentEntity p) {
		return cService.insCmtGroup(p);
	}
}
