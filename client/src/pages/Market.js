import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category, ProductList, Pagination } from '../components';
import { useLocation, useParams } from 'react-router-dom';
import callApi from '../utils/callApi';

const MarketBlock = styled.div`
  width: 954px;
  margin: 40px auto;
`;

function Market() {
  const { state } = useLocation();

  const pagePer = 20;
  const [prods, setProds] = useState([]);
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
    try {
      if (!state || state === undefined || state === null) {
        callApi(
          'get',
          '/market/product',
          { params: { cat_id: category } },
          setProds
        );
      } else {
        callApi(
          'get',
          '/market/search/product',
          { params: { state: state.query } },
          setProds
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [category, state]);

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
