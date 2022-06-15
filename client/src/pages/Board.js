import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BoardHeader, BoardList, Pagination } from '../components';
import getData from '../utils/getData';

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
      getData(process.env.REACT_APP_URL, '/board', setPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    goBoard();
  }, []);

  const handleSearch = e => {
    try {
      const callApi = async () => {
        const res = await axios.post('http://localhost:5000/board/search', e);
        setPosts(res.data);
      };
      callApi();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      getData(process.env.REACT_APP_URL, '/board', setPosts);
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
