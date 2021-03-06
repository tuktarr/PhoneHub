package com.tuktarr.phonehub.user;

import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tuktarr.phonehub.model.UserEntity;

@Controller
public class EmailController {
	
	@Autowired
	EmailService service;
	
	//로그 객체 생성
	private static final Logger Logger = LoggerFactory.getLogger(EmailController.class);

	//이메일 보내기 ajax 처리
	@PostMapping("/email")
	@ResponseBody
	public void emailConfirm(@RequestBody String m) throws Exception {
		
		Logger.info("post emailConfirm");
		
		// 인증키 생성
		EmailService.ePw = EmailService.createKey();
		service.sendSimpleMessage(m);
	}
	
	@PostMapping("/chkemail")
	@ResponseBody
	public Map<String, Object> emailChk(@RequestBody UserEntity p) {
		Map<String, Object> map = new HashMap<>();	
		map.put("check",service.chkEmail(p));
		System.out.println("아이디확인2: " + p.getUserEmail());
		return map;
	}
	
	//인증번호 입력 후 일치여부 ajax처리
	@PostMapping("/verifyCode")
	@ResponseBody
	public int verifyCode(@RequestBody String code, Model model) {
		System.out.println(code);
		Logger.info("Post verifyCode");
		
		int result = 0;
		if (EmailService.ePw.equals(code)) { //입력한 값과 인증키로 보낸 값이 일치하면 result = 1
			result = 1;
		}
		System.out.println(result);
		
		return result;
	}
}

