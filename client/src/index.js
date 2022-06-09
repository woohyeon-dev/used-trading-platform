import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Context from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ContextProvider = ({ children }) => {
  const setLoggedIn = condition => {
    setState(prevState => ({
      ...prevState,
      loggedIn: condition,
    }));
  };

  const initialState = {
    loggedIn: false,
    setLoggedIn,
  };

  const [state, setState] = useState(initialState);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
