import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ReplyCreateBlock = styled.div`
  textarea {
    border: 2px solid black;
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
    padding: 5px;
    font-size: 16px;
  }

  .inputNum {
    margin-top: 5px;
    margin-left: 3px;
    font-weight: bold;
    font-size: 20px;
  }
`;

function ReplyCreate() {
  const [content, setContent] = useState('');
  const [inputNum, setInputNum] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    const callApi = async () => {
      const res = await axios.post(
        'http://localhost:5000/semester/create',
        { content },
        { withCredentials: true }
      );
      console.log(res.data);
    };
    try {
      callApi();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInputNum(content.length);
  }, [content]);

  return (
    <ReplyCreateBlock>
      <form onSubmit={handleSubmit}>
        <textarea
          name='content'
          placeholder='후기를 남겨주세요'
          value={content}
          onChange={e => setContent(e.target.value)}
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
