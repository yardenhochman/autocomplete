import React, { createContext, useContext } from 'react';

const AppContext = createContext({ version2: false });

export const withContext = Component => props => {
  const value = useContext(AppContext);
  return <Component {...{ ...value, ...props }} />;
};

export const { Provider } = AppContext;
