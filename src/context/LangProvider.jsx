import { createContext, useState } from 'react';

const LangContext = createContext({});

export const LangContextProvider = ({ children }) => {
  const [lang, setLang] = useState('english');

  const toogleLang = () => {
    setLang((prev) => (prev === 'english' ? 'ukrainian' : 'english'));
  };

  const value = {
    lang,
    toogleLang,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export default LangContext;
