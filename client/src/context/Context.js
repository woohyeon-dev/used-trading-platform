import { createContext } from 'react';

const Context = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

export default Context;
