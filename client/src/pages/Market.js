import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ProductList, Pagination } from '../components';

const MarketBlock = styled.div`
  margin: 40px 0;
`;

function Market() {
  const [prod, setProd] = useState([{}]);
  // 페이지당 보여줄 게시물 수
  const pagePer = 20;
  // const pagePer = 1;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pagePer);
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 게시물 개수
  const totalProdCnt = prod.length;

  useEffect(() => {
    const callApi = async () => {
      const response = await axios.get('http://localhost:5000/market');
      setProd(response.data);
    };
    callApi();
  }, []);

  useEffect(() => {
    setStart((currentPage - 1) * pagePer);
    setEnd(currentPage * pagePer);
  }, [currentPage]);

  const toggleCurrentPage = e => {
    setCurrentPage(e);
  };

  return (
    <MarketBlock>
      <ProductList prods={prod.slice(start, end)} />
      <Pagination
        pagePer={pagePer}
        totalPostCnt={totalProdCnt}
        currentPage={currentPage}
        toggleCurrentPage={e => toggleCurrentPage(e)}
      />
    </MarketBlock>
  );
}

export default Market;
