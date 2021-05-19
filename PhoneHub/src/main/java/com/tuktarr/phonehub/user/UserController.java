package com.tuktarr.phonehub.user;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.UserEntity;

@Controller
public class UserController {

	@Autowired
	UserService service;
	
	@GetMapping("/login")
	public String login() {
		return "sign/login";
	}
	
	@GetMapping("/join")
	public String join() {
		return "sign/join";
	} //회원가입 화면 맵핑
	
	//join ajax처리
	@ResponseBody
	@PostMapping("/join")
	public Map<String, Object> join(@RequestBody UserEntity p) {
		Map<String, Object> map = new HashMap<>();
		map.put("result",service.join(p));
		System.out.println("비번 : " + p.getUserPw());
		System.out.println("비번확인 : " + p.getUserPwRe());
		return map;
	}
	
	@ResponseBody
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody UserEntity p, HttpSession hs) throws Exception {

		Map<String, Object> map = new HashMap<>();
		map.put("result", service.login(p, hs));
		System.out.println("아이디 :" + p.getUserEmail());
		System.out.println("pk:" + p.getUserPk());
		return map;
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession hs) {
		hs.invalidate();
		return "redirect:/";
	}
	
	@GetMapping("/findpw")
	public String findpw() {
		return "sign/findpw";
	}
	
	@ResponseBody
	@PostMapping("/findpw")
	public Map<String, Object> findPw(@RequestBody UserEntity p) throws Exception {
		Map<String, Object> map = new HashMap<>();
		map.put("result", service.findPw(p));
		return map;
	}
	
}
