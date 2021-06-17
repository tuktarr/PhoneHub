package com.tuktarr.phonehub.utils;

import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;

import com.tuktarr.phonehub.model.UserDomain;

import java.util.regex.Matcher;

@Component
public class PatternUtils {
	
	public boolean PatternPassword(UserDomain p) {
		boolean password_check = Pattern.matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$",p.getUserNewPw());
		return password_check;	
	}
}
