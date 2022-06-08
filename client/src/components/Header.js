import React from 'react';
import styled from 'styled-components';
import HeaderBtn from './HeaderBtn';
import { NavLink } from 'react-router-dom';

const HeaderBlock = styled.div`
  padding: 0 30px;
  background-color: white;
  border-bottom: 1px solid black;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 200px;
    height: 60px;
    color: black;
    font-family: 'YES24';
    color: green;
    font-size: 43px;
    text-align: center;
    font-weight: bold;
    line-height: 60px;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }

  .search {
    font-family: 'GyeonggiBatang';
    font-size: 16px;
    width: 440px;
    height: 45px;
    line-height: 40px;
    padding: 0 15px;
    border: 2px solid green;
  }

  .search:focus {
    outline: none;
  }
`;

function Header() {
  return (
    <HeaderBlock>
      <NavLink to='/' className='logo'>
        영숙마켓
      </NavLink>
      <input className='search' placeholder='상품명을 입력하세요'></input>
      <HeaderBtn />
    </HeaderBlock>
  );
}

export default Header;
