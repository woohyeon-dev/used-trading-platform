import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductList from '../components/market/ProductList';

const MarketBlock = styled.div`
  margin: 40px 20px;
`;

function Market() {
  const [prods, setProds] = useState([{}]);

  useEffect(() => {
    const callApi = async () => {
      const response = await axios.get('http://localhost:5000/market');
      setProds(response.data);
    };
    callApi();
  }, []);

  return (
    <MarketBlock>
      <ProductList prods={prods} />
    </MarketBlock>
  );
}

export default Market;
