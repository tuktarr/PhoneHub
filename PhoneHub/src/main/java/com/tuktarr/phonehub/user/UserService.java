package com.tuktarr.phonehub.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.UserEntity;
import com.tuktarr.phonehub.utils.SecurityUtils;

@Service
public class UserService {

	@Autowired
	private UserMapper mapper;

	@Autowired
	private SecurityUtils sUtils;
	
	public int join(UserEntity p) {
		UserEntity check = mapper.selUser(p);

		if(p.getUserEmail().equals("")) { // 아이디 (이메일)칸이 비어 있으면 0을 리턴
			return 0;
		}

		// 비밀번호를 암호화
		String salt = sUtils.getSalt();
		String hashPw = sUtils.getHashPw(p.getUserPw(), salt);

		if(check != null) { // 이미 있는 아이디(이메일)이면 1을 리턴
			return 1;
		}

		if(p.getUserPw().equals("")) { // 비밀번호 칸이 비어 있으면 2를 리턴
			return 2;
		}

		if(p.getUserPwRe().equals("")) { // 비밀번호 확인 칸이 비어 있으면 3을 리턴
			return 3;
		}

		if(p.getNickname().equals("")) { // 닉네임칸이 비어 있으면 4를 리턴
			return 4;
		}

		if(!p.getUserPw().equals(p.getUserPwRe())) { // 비밀번호와 비밀번호 확인 칸의 값이 다르면 5를 리턴
			System.out.println("비번 : " + p.getUserPw());
			System.out.println("비번확인 : " + p.getUserPwRe());
			return 5;
		}
		
		if(p.getBirthday().equals("")) { //생일 칸이 비어 있으면 6을 리턴
			return 6;
		}
		
		if(p.getPhone().equals("")) { //전화번호 칸이 비어 있으면 7을 리턴
			return 7;
		}
		p.setUserPw(hashPw);
		
		mapper.insUser(p); // if문에서 하나도 안걸리면 정보를 입력

		return 8; // 회원가입이 성공하면 8을 리턴
	}
	
}
