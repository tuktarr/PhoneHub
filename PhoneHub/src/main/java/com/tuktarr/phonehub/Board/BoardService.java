package com.tuktarr.phonehub.Board;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tuktarr.phonehub.model.BoardDTO;
import com.tuktarr.phonehub.model.BoardDomain;
import com.tuktarr.phonehub.model.BoardEntity;
import com.tuktarr.phonehub.utils.SecurityUtils;

@Service
public class BoardService {

		@Autowired
		SecurityUtils sUtils;
		
		@Autowired
		BoardMapper mapper;
		
		//insert
		public int insBoard(BoardEntity p) {
			
			if(p.getTitle().equals("")) {
				return 0;
			}
			
			if(p.getCtnt().equals("")) {
				return 1;
			}
			
			mapper.insBoard(p);
			return 2; 
		}
		
		//select
		public BoardDomain selBoardDetail(BoardEntity p, HttpSession hs) {
			if(sUtils.getLoginUser(hs) != null) {
				BoardEntity pa = new BoardEntity();
				pa.setBoardPk(p.getBoardPk());
				pa.setHits(1); //조회수 증가
				mapper.upBoard(pa);
			}
			
			return mapper.selBoard(p);
		}
		
		// 페이징
		public List<BoardDomain> selBoardList(BoardDTO p) {
			int sIdx = (p.getPage() - 1) * p.getRowCnt();
			p.setsIdx(sIdx);

			return mapper.selBoardList(p);
		}
		
		// max값 구하기
		public int selMaxPageNum(BoardDTO p) {
			return mapper.selMaxPageNum(p);
		}
		
		//select
		public BoardEntity selBoard(BoardEntity p) {
			return mapper.selBoard(p);
		}
		
		//update
		public int upBoard(BoardEntity p) {
			if(p.getTitle().equals("")) {
				return 0;
			}
			
			if(p.getCtnt().equals("")) {
				return 1;
			}
			
			mapper.upBoard(p);
			return 2;
		}
		
		//delete
		public int delBoard(BoardEntity p) {
			p.setIsDel(1); //삭제되면 isDel 1
			return mapper.upBoard(p);
		}
		
		public int upVoteCount(BoardEntity p) {
			return mapper.upVoteCount(p);
		}
		
		public int upBlameCount(BoardEntity p) {
			return mapper.upBlameCount(p);
		}
}
