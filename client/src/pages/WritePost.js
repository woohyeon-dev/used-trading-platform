import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const WritePostBlock = styled.div`
  width: 984px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 30px 0 60px 0;
  background-color: #dfdfde;

  form {
    margin: 0 auto;
  }

  input {
    font-family: 'GyeonggiBatang';
    width: 904px;
    height: 50px;
    font-size: 18px;
    padding: 17px;
    border: 2px solid black;

    &:focus {
      outline: none;
    }
  }

  textarea {
    font-family: 'GyeonggiBatang';
    width: 904px;
    height: 400px;
    font-size: 19px;
    line-height: 30px;
    margin: 30px 0;
    padding: 15px;
    resize: none;
    border: 2px solid black;

    &:focus {
      outline: none;
    }
  }

  button {
    font-family: 'GyeonggiBatang';
    padding: 12px;
    font-size: 18px;
    background-color: white;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }

  .writePostBtnGroup {
    display: flex;
  }

  .backToList {
    text-decoration: none;
    color: black;
  }

  .writeBtn {
    background-color: green;
    color: white;
    margin-left: 30px;
  }
`;

function WritePost() {
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  });

  const { title, content } = inputs;

  const handleInputs = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };
  const handleSubmit = e => {
    e.preventDefault();

    try {
      const callApi = async () => {
        const res = await axios.post(
          'http://localhost:5000/board/write',
          inputs
        );
      };
      callApi();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WritePostBlock>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            id='title_txt'
            name='title'
            value={title}
            onChange={handleInputs}
            placeholder='제목을 입력하세요'
          />
        </div>
        <div>
          <textarea
            id='content_txt'
            name='content'
            placeholder='내용을 입력하세요'
            value={content}
            onChange={handleInputs}
          />
        </div>
        <div className='writePostBtnGroup'>
          <button>
            <NavLink to='/board' className='backToList'>
              목록으로
            </NavLink>
          </button>
          <button className='writeBtn' type='submit'>
            작성하기
          </button>
        </div>
      </form>
    </WritePostBlock>
  );
}

export default WritePost;
