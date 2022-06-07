import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  Home,
  Group,
  Market,
  Board,
  MyPage,
  WritePost,
  Sell,
  Post,
  Product,
} from '../pages';
import { Layout, Header, Footer, Navigation } from '../components';

function HomeRouter() {
  return (
    <Layout>
      <Header />
      <Navigation />
      <Routes>
        {/* Home page */}
        <Route path='' element={<Home />} />
        {/* Group page */}
        <Route path='group' element={<Group />} />
        {/* Market page */}
        <Route path='market' element={<Market />} />
        <Route path='market/categories/:cat_id' element={<Market />} />
        {/* Product Page */}
        <Route path='market/product/:p_id' element={<Product />} />
        {/* WriteProdPost Page */}
        <Route path='/market/sell' element={<Sell />} />
        {/* Board Page */}
        <Route path='board' element={<Board />} />
        {/* Post Page */}
        <Route path='board/:post_id' element={<Post />} />
        {/* WritePost Page */}
        <Route path='board/write' element={<WritePost />} />
        {/* MyPage Page */}
        <Route path='mypage' element={<MyPage />} />
        {/* Error Page */}
        <Route path='*' element={<Navigate replace to='/error' />} />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default HomeRouter;
