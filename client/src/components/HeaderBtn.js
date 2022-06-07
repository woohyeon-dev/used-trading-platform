import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Context from '../context/Context';
import axios from 'axios';

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

function HeaderBtn() {
  const { loggedIn, setLoggedIn } = useContext(Context);

  const handleLogout = async e => {
    try {
      const logout = await axios.post(
        'http://localhost:5000/auth/logout',
        {},
        { withCredentials: true }
      );
      alert(logout.data);
      setLoggedIn(false);
      //성공하면 해당 url로 이동
      // navigate('/');
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <HeaderBtnBlock>
      <div className='profile'>
        {loggedIn ? (
          <div className='profileButtons' onClick={handleLogout}>
            로그아웃
          </div>
        ) : (
          <NavLink to='/login' className='profileButtons'>
            로그인
          </NavLink>
        )}
        <NavLink to='/market/sell' className='profileButtons'>
          판매하기
        </NavLink>
      </div>
    </HeaderBtnBlock>
  );
}

export default HeaderBtn;
