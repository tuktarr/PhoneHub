package com.tuktarr.phonehub.Board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tuktarr.phonehub.model.BoardDTO;
import com.tuktarr.phonehub.model.BoardDomain;
import com.tuktarr.phonehub.model.BoardEntity;

@Mapper
public interface BoardMapper {
	int insBoard(BoardEntity p);
	List<BoardDomain> selBoardList(BoardDTO p);
	BoardDomain selBoard(BoardEntity p);
	int upBoard(BoardEntity p);
	int selMaxPageNum(BoardDTO p);
	int upVoteCount(BoardEntity p);
	int upBlameCount(BoardEntity p);
}
