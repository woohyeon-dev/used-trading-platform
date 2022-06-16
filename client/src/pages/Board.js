import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BoardHeader, BoardList, Pagination } from '../components';
import callApi from '../utils/callApi';

const BoardBlock = styled.div`
  margin: 40px 20px;
`;

function Board() {
  // 페이지당 보여줄 게시물 수
  const pagePer = 20;

  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pagePer);
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 게시물 개수
  const totalPostCnt = posts.length;

  const goBoard = () => {
    try {
      callApi('get', '/board', {}, setPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    goBoard();
  }, []);

  const handleSearch = e => {
    try {
      callApi('get', '/board/search', { params: e }, setPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      callApi('get', '/board', {}, setPosts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setStart((currentPage - 1) * pagePer);
    setEnd(currentPage * pagePer);
  }, [currentPage]);

  const toggleCurrentPage = e => {
    setCurrentPage(e);
  };

  return (
    <BoardBlock>
      <BoardHeader
        handleSearch={e => {
          handleSearch(e);
        }}
        goBoard={e => {
          goBoard(e);
        }}
      />
      <BoardList posts={posts.slice(start, end)} />
      <Pagination
        pagePer={pagePer}
        totalPostCnt={totalPostCnt}
        currentPage={currentPage}
        toggleCurrentPage={e => toggleCurrentPage(e)}
      />
    </BoardBlock>
  );
}

export default Board;
