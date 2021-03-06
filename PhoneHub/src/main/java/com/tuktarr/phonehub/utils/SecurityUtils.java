package com.tuktarr.phonehub.utils;

import javax.servlet.http.HttpSession;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

import com.tuktarr.phonehub.model.UserEntity;

@Component
public class SecurityUtils {

	public int getLoginUserPk(HttpSession hs) { 
		UserEntity loginUser = getLoginUser(hs);
		
		return loginUser == null ? -1: loginUser.getUserPk();
	}

	public UserEntity getLoginUser(HttpSession hs) {
		return (UserEntity)hs.getAttribute("loginUser");
	}

	public String getSalt() { 
		return BCrypt.gensalt();
	}
	
	public String getHashPw(String pw, String salt) {
		return BCrypt.hashpw(pw, salt);
	}
}
