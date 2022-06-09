import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ProductList, BoardList } from '../components';

const HomeBlock = styled.div`
  .advertisement {
    display: block;
    width: 1024px;
    height: 250px;
    background-color: #dfdfde;
    text-decoration: none;
    color: black;
  }

  .homeContent {
    padding: 0 20px;
  }

  .title {
    display: block;
    font-size: 22px;
    font-weight: bold;
    margin-top: 60px;
    margin-left: 5px;
    margin-bottom: 18px;
    text-decoration: none;
    color: black;
  }

  .titleBox {
    width: 984px;
    height: auto;
    border: 1px solid black;
    margin-bottom: 40px;
    padding: 15px;
  }
`;

function Home() {
  const [recentPosts, setRecentPosts] = useState([{}]);
  const [recentProds, setRecentProds] = useState([{}]);

  useEffect(() => {
    const callApi = async () => {
      const res1 = await axios.get('http://localhost:5000/home/board');
      const res2 = await axios.get('http://localhost:5000/home/product');
      setRecentPosts(res1.data);
      setRecentProds(res2.data);
    };
    try {
      callApi();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <HomeBlock>
      <NavLink to='/lss' className='advertisement'>
        현지학기제 광고
      </NavLink>
      <div className='homeContent'>
        <NavLink to='/market' className='title'>
          최근 등록 상품
        </NavLink>
        <div className='titleBox'>
          <ProductList prods={recentProds} />
        </div>
        <NavLink to='/board' className='title'>
          최근 등록 게시물
        </NavLink>
        <div className='titleBox'>
          <BoardList posts={recentPosts} />
        </div>
      </div>
    </HomeBlock>
  );
}

export default Home;
