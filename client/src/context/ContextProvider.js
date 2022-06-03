import { useState } from 'react';

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
