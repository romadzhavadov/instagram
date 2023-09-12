import { useContext } from 'react';
import LangContext from '../context/LangProvider';

const useLang = () => {
  return useContext(LangContext);
};

export default useLang;
