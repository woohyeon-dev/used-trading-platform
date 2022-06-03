import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Login, Register, Semester, Error } from './pages';
import HomeRouter from './routes/HomeRouter';
import Context from './context/Context';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GyeonggiBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'YES24';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YES24.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    // background: #e9ecef;
    font-family: 'GyeonggiBatang';
  }
`;

function App() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('user_id') === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin);
      setIsLogin(false);
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      console.log('isLogin ?? :: ', isLogin);
      setIsLogin(true);
    }
  }, [isLogin]);

  const ContextProvider = ({ children }) => {
    const setLoggedUser = data => {
      setState(prevState => ({
        ...prevState,
        loggedUser: data,
      }));
    };

    const setLoggedIn = () => {
      setState(prevState => ({
        ...prevState,
        loggedIn: !prevState.loggedIn,
      }));
    };

    const initialState = {
      loggedUser: {},
      loggedIn: false,
      setLoggedUser,
      setLoggedIn,
    };

    const [state, setState] = useState(initialState);

    return <Context.Provider value={state}>{children}</Context.Provider>;
  };

  return (
    <ContextProvider>
      <GlobalStyle />
      <Routes>
        {/* Home Page */}
        <Route path='/*' element={<HomeRouter isLogin={isLogin} />} />
        {/* Login Page */}
        <Route path='/login' element={<Login />} />
        {/* Register Page */}
        <Route path='/register' element={<Register />} />
        {/* Semester Page */}
        <Route path='/lss' element={<Semester />} />
        {/* Error Page */}
        <Route path='/error' element={<Error />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
