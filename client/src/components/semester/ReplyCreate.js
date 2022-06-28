import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../context/Context';
import callApi from '../../utils/callApi';

const ReplyCreateBlock = styled.div`
  textarea {
    border: 1px solid lightgrey;
    color: black;
    padding: 10px;
    letter-spacing: 2px;
    font-size: 18px;
    font-family: 'GyeonggiBatang';
    display: block;
    resize: none;
    width: 100%;
    height: 80px;
    background-color: white;

    &:focus {
      outline: none;
    }
  }

  .buttonGroup {
    display: flex;
    justify-content: space-between;
  }

  button {
    margin-top: 5px;
    padding: 7px;
    font-size: 18px;
    border: 1px solid silver;
    border-radius: 4px;
    color: black;
    font-family: 'GyeonggiBatang';
    background-color: #f3f3f3;

    &:hover {
      cursor: pointer;
      background-color: silver;
      transform: scale(0.97);
    }
  }

  .inputNum {
    margin-top: 7px;
    margin-left: 8px;
    font-size: 20px;
  }
`;

function ReplyCreate({ setUpdate }) {
  const [createData, setCreateData] = useState({ content: '' });
  const [inputNum, setInputNum] = useState(0);
  const { loggedIn } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!loggedIn) {
      // 로그인 유저가 아닐 경우
      alert('로그인이 필요합니다.');
      return navigate('/login');
    }
    setUpdate(true);
    await callApi('post', '/semester/create', createData);
    setUpdate(false);
    setCreateData({ content: '' });
    // window.location.reload();
    // navigate('/semester');
  };

  const handleTextarea = e => {
    const { value, name } = e.target;
    if (value.length <= 50) {
      setCreateData({ ...createData, [name]: value });
    }
  };

  useEffect(() => {
    setInputNum(createData.content.length);
  }, [createData.content]);

  return (
    <ReplyCreateBlock>
      <form onSubmit={handleSubmit}>
        <textarea
          name='content'
          placeholder='후기를 남겨주세요'
          value={createData.content}
          onChange={handleTextarea}
          required
        />
        <div className='buttonGroup'>
          <div className='inputNum'>{inputNum}/50</div>
          <button type='submit'>작성하기</button>
        </div>
      </form>
    </ReplyCreateBlock>
  );
}

export default ReplyCreate;
