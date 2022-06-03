import { createContext } from 'react';

const Context = createContext({
  loggedUser: {
    user_id: '',
    nickname: '',
  },
  loggedIn: false,
  setLoggedUser: () => {},
  setLoggedIn: () => {},
});

export default Context;
