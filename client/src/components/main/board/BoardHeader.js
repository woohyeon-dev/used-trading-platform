import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const BoardHeaderBlk = styled.div`
  width: 954px;
  margin: 0 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  .boardTitle {
    font-size: 25px;
    font-weight: bold;
  }

  .boardBtnGroup {
    display: flex;
  }

  .searchPost {
    padding: 0 10px;
    width: 300px;
    font-family: 'GyeonggiBatang';
    font-size: 16px;
  }

  .boardBtn {
    border: 1px solid black;
    text-align: center;
    padding: 8px;
    margin-left: 15px;

    &:hover {
      background-color: #dfdfde;
      transform: scale(0.98);
      cursor: pointer;
    }
  }

  .boardWriteBtn {
    text-decoration: none;
    color: black;
  }
`;

function BoardHeader() {
  const handleSearchBtn = () => {
    console.log('Clicked search button');
  };

  const handleListBtn = () => {
    console.log('Clicked list button');
  };

  return (
    <BoardHeaderBlk>
      <div className='boardTitle'>자유게시판</div>
      <div className='boardBtnGroup'>
        <input className='searchPost' placeholder='제목을 입력하세요'></input>
        <div className='searchBtn boardBtn' onClick={handleSearchBtn}>
          검색
        </div>
        <div className='listBtn boardBtn' onClick={handleListBtn}>
          목록
        </div>
        <div className='boardBtn'>
          <NavLink to='/board/write' className='boardWriteBtn'>
            쓰기
          </NavLink>
        </div>
      </div>
    </BoardHeaderBlk>
  );
}

export default BoardHeader;
