import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category, ProductList, Pagination } from '../components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MarketBlock = styled.div`
  width: 954px;
  margin: 40px auto;
`;

function Market() {
  const pagePer = 20;
  // const pagePer = 1;
  const [prods, setProds] = useState([{}]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pagePer);
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState(0);
  const params = useParams();

  // 전체 게시물 개수
  const totalProdsCnt = prods.length;

  useEffect(() => {
    setCategory(params.cat_id ? params.cat_id : 0);
    setCurrentPage(1);
  }, [category, params]);

  useEffect(() => {
    setStart((currentPage - 1) * pagePer);
    setEnd(currentPage * pagePer);
  }, [currentPage]);

  const toggleCurrentPage = e => {
    setCurrentPage(e);
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get('http://localhost:5000/market/product', {
        params: { cat_id: category },
      });
      setProds(res.data);
    };
    callApi();
  }, [category]);

  return (
    <MarketBlock>
      <Category />
      <ProductList prods={prods.slice(start, end)} />
      <Pagination
        pagePer={pagePer}
        totalPostCnt={totalProdsCnt}
        currentPage={currentPage}
        toggleCurrentPage={e => toggleCurrentPage(e)}
      />
    </MarketBlock>
  );
}

export default Market;
