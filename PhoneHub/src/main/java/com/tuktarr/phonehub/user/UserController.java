package com.tuktarr.phonehub.user;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.UserDomain;
import com.tuktarr.phonehub.model.UserEntity;
import com.tuktarr.phonehub.utils.SecurityUtils;

@Controller
public class UserController {

	@Autowired
	UserService service;
	
	@Autowired
	SecurityUtils sUtils;
	
	@GetMapping("/login")
	public String login() {
		return "sign/login";
	}
	
	@GetMapping("/join")
	public String join() {
		return "sign/join";
	} //회원가입 화면 맵핑
	
	@GetMapping("/mypage")
	public String myPage(Model model, HttpSession hs) {
		UserEntity p = new UserEntity();
		p.setUserPk(sUtils.getLoginUser(hs).getUserPk());
		model.addAttribute("user", service.selUser(p));
		return "sign/mypage";
	}
	
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
		UserEntity check = service.selUser(p);
		System.out.println("아이디 :" + p.getUserEmail());
		System.out.println("pk:" + check.getUserPk());
		return map;
	}
	
	@ResponseBody
	@PostMapping("/mypassword")
	public Map<String, Object> myPassword(@RequestBody UserDomain p, HttpSession hs) throws Exception {
		Map<String, Object> map = new HashMap<>();
		map.put("password",service.passwordChange(p, hs));
		return map;
	}
	
	@ResponseBody
	@PostMapping("/myremainder")
	public Map<String, Object> myRemainder(@RequestBody UserDomain p, HttpSession hs) throws Exception {
		Map<String, Object> map = new HashMap<>();
		p.setUserEmail(sUtils.getLoginUser(hs).getUserEmail());
		System.out.println("Email:" + sUtils.getLoginUser(hs).getUserEmail());
		map.put("remainder",service.remainderChange(p, hs));
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
