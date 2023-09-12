import { createContext, useState } from 'react';

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('darkTheme');

  const toogleTheme = () => {
    setTheme((prev) => (prev === 'darkTheme' ? 'lightTheme' : 'darkTheme'));
  };

  const value = {
    theme,
    toogleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
