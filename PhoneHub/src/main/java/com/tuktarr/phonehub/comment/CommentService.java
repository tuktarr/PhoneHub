package com.tuktarr.phonehub.comment;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.CommentEntity;
import com.tuktarr.phonehub.utils.SecurityUtils;

@Service
public class CommentService {
	
	@Autowired
	CommentMapper mapper;
	
	@Autowired
	SecurityUtils sUtils;

	public int selCmtCount(CommentEntity p) {
		return mapper.selCmtCount(p);
	}

	public int insCmt(CommentEntity p) {
		System.out.println("게시판 몇번 :" + p.getBoardPk());
		if(p.getCtnt().equals("")) {
			return 0;
		} else {
			p.setDepth(0);
			mapper.insCmt(p);			
			return 1;
		}
	}
	
	public List<CommentEntity> selCmt(CommentEntity p) {
		return mapper.selCmt(p);
	}
	
	public int delCmt(CommentEntity p, HttpSession hs) {
		if(p.getUserPk() == sUtils.getLoginUserPk(hs)) {
			mapper.delCmt(p);
			return 1;
		} else {
			return 0;
		}
	}
}
