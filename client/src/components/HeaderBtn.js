import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderBtnBlock = styled.div`
  .profile {
    width: 240px;
    display: flex;
    justify-content: flex-end;
    // border: 1px solid blue;
  }

  .profileButtons {
    width: 100px;
    height: 40px;
    border: 2px solid black;
    line-height: 38px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    color: black;

    /* 버튼 사이의 간격 */
    &:not(:first-child) {
      margin-left: 20px;
    }

    &:hover {
      background-color: #dfdfde;
      transform: scale(0.98);
      cursor: pointer;
    }
  }
`;

function HeaderBtn({ isLogin }) {
  return (
    <HeaderBtnBlock>
      {isLogin ? (
        <div className='profile'>
          <NavLink to='/' className='profileButtons'>
            로그아웃
          </NavLink>
          <NavLink to='/mypage' className='profileButtons'>
            마이페이지
          </NavLink>
        </div>
      ) : (
        <div className='profile'>
          <NavLink to='/signin' className='profileButtons'>
            로그인
          </NavLink>
          <NavLink to='/signup' className='profileButtons'>
            회원가입
          </NavLink>
        </div>
      )}
    </HeaderBtnBlock>
  );
}

export default HeaderBtn;
