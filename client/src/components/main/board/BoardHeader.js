import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Context from '../../../context/Context';

const BoardHeaderBlk = styled.div`
  width: 984px;
  margin: 0 15px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;

  .boardTitle {
    font-size: 30px;
    font-weight: bold;
  }

  .boardBtnGroup {
    display: flex;
  }

  .searchPost {
    width: 300px;
    height: 40px;
    padding: 0 10px;
    font-family: 'GyeonggiBatang';
    font-size: 17px;
    border: 1px solid black;
  }

  .boardBtn {
    border: 1px solid black;
    text-align: center;
    width: 53px;
    font-size: 17px;
    line-height: 40px;
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
  const { loggedIn } = useContext(Context);
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
        {loggedIn && (
          <NavLink to='/board/write' className='boardWriteBtn'>
            <div className='boardBtn'>쓰기</div>
          </NavLink>
        )}
      </div>
    </BoardHeaderBlk>
  );
}

export default BoardHeader;
