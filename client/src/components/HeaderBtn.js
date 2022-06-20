import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import callApi from '../utils/callApi';

const HeaderBtnBlock = styled.div`
  .profile {
    width: 240px;
    display: flex;
    justify-content: flex-end;
  }

  .profileButtons {
    width: 100px;
    height: 45px;
    border: 2px solid black;
    line-height: 43px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    color: black;

    /* 버튼 사이의 간격 */
    &:not(:first-child) {
      margin: 0 20px;
    }

    &:hover {
      background-color: #dfdfde;
      transform: scale(0.98);
      cursor: pointer;
    }
  }
`;

function HeaderBtn() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(Context);

  const handleLogout = async e => {
    const res = callApi('post', '/auth/logout', {});
    if (res) {
      setLoggedIn(false);
    }
  };

  const handleSellBtn = async e => {
    if (loggedIn) {
      navigate('/market/create');
    } else {
      alert('로그인 후 이용가능합니다.');
      navigate('/login');
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
        <div className='profileButtons' onClick={handleSellBtn}>
          판매하기
        </div>
      </div>
    </HeaderBtnBlock>
  );
}

export default HeaderBtn;
