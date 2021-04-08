package com.tuktarr.phonehub.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

	@GetMapping("/login")
	public String login() {
		return "sign/login";
	}
	
	@GetMapping("/join")
	public String join() {
		return "sign/join";
	}
	
}
