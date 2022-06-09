import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BoardHeader, BoardList, Pagination } from '../components';

const BoardBlock = styled.div`
  margin: 40px 20px;
`;

function Board() {
  // 페이지당 보여줄 게시물 수
  const pagePer = 20;
  // const pagePer = 1;
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pagePer);
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 게시물 개수
  const totalPostCnt = posts.length;

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get('http://localhost:5000/board');
      setPosts(res.data);
    };
    try {
      callApi();
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
      <BoardHeader />
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
