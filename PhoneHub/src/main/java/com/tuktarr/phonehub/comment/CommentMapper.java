package com.tuktarr.phonehub.comment;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.CommentEntity;

@Mapper
public interface CommentMapper {
	int insCmt(CommentEntity p);
	int insCmtGroup(CommentEntity p);
	int selCmtCount(CommentEntity p);
	List<CommentEntity> selCmt(CommentEntity p);
}
