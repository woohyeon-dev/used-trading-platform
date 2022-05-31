import React from 'react';
import styled from 'styled-components';
import HeaderBtn from './HeaderBtn';
import { NavLink } from 'react-router-dom';

const HeaderBlock = styled.div`
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid black;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 220px;
    height: 60px;
    border: 2px solid black;
    color: black;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }

  .search {
    font-family: 'GyeonggiBatang';
    font-size: 16px;
    width: 450px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    border: 2px solid green;
  }

  .search:focus {
    outline: none;
  }
`;

function Header({ isLogin }) {
  return (
    <HeaderBlock>
      <NavLink to='/' className='logo'>
        logo
      </NavLink>
      <input className='search' placeholder='상품명을 입력하세요'></input>
      <HeaderBtn isLogin={isLogin} />
    </HeaderBlock>
  );
}

export default Header;
