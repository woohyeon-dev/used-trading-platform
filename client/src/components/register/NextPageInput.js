import React, { useState } from 'react';
import styled from 'styled-components';

const NextPageInputBlock = styled.div`
  display: flex;
  flex-direction: column;

  .nextInputs {
    width: 260px;
    height: 45px;
    margin: 8px 0px;
    padding: 10px;
    border: 1px solid #dfdfde;
    background-color: #f8f9fa;
    font-size: 15px;
    font-family: 'GyeonggiBatang';

    &:focus {
      outline: none;
    }
  }

  .message {
    padding: 0 11px;
    margin-bottom: 6px;
    font-size: 13px;
  }

  .prevBtn {
    width: 260px;
    height: 45px;
    margin-top: 15px;
    background-color: lightgrey;
    color: white;
    font-size: 17px;
    font-weight: bold;
    line-height: 45px;
    text-align: center;
  }

  .registerBtn {
    width: 260px;
    height: 45px;
    margin-top: 13px;
    margin-bottom: 50px;
    background-color: green;
    color: white;
    border: none;
    font-size: 17px;
    font-weight: bold;
    font-family: 'GyeonggiBatang';

    &:hover {
      cursor: pointer;
    }
  }
`;

function NextPageInput({ registerInfo, handleChange, handlePage }) {
  const [isName, setIsName] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isAddr, setIsAddr] = useState(false);
  const [isPhoneNum, setIsPhoneNum] = useState(false);

  return (
    <NextPageInputBlock>
      <input
        className='nextInputs'
        type='text'
        placeholder='사용자 이름'
        name='name'
        value={registerInfo.name}
        onChange={e => {
          handleChange(e);
          if (e.target.value.length !== 0) {
            setIsName(true);
          } else {
            setIsName(false);
          }
        }}
      />
      {isName ? null : (
        <div className='message'>{'사용자 이름은 필수 입력 항목입니다.'}</div>
      )}
      <input
        className='nextInputs'
        type='text'
        placeholder='닉네임'
        name='nickname'
        value={registerInfo.nickname}
        onChange={e => {
          handleChange(e);
          if (e.target.value.length !== 0) {
            setIsNickname(true);
          } else {
            setIsNickname(false);
          }
        }}
      />
      {isNickname ? null : (
        <div className='message'>{'닉네임은 필수 입력 항목입니다.'}</div>
      )}
      <input
        className='nextInputs'
        type='text'
        placeholder='주소'
        name='addr'
        value={registerInfo.addr}
        onChange={e => {
          handleChange(e);
          if (e.target.value.length !== 0) {
            setIsAddr(true);
          } else {
            setIsAddr(false);
          }
        }}
      />
      {isAddr ? null : (
        <div className='message'>{'주소는 필수 입력 항목입니다.'}</div>
      )}
      <input
        className='nextInputs'
        type='text'
        placeholder='전화번호'
        name='phone_num'
        value={registerInfo.phone_num}
        onChange={e => {
          handleChange(e);
          if (e.target.value.length !== 0) {
            setIsPhoneNum(true);
          } else {
            setIsPhoneNum(false);
          }
        }}
      />
      {isPhoneNum ? null : (
        <div className='message'>{'전화번호는 필수 입력 항목입니다.'}</div>
      )}
      <div className='prevBtn' onClick={handlePage}>
        이전
      </div>
      <button className='registerBtn' type='submit'>
        가입
      </button>
    </NextPageInputBlock>
  );
}

export default NextPageInput;
