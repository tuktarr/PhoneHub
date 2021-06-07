package com.tuktarr.phonehub.comment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.CommentEntity;

@Service
public class CommentService {
	
	@Autowired
	CommentMapper mapper;

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
}
