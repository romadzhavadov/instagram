import { createContext, useRef } from 'react';


const TextareaContext = createContext();

export const TextareaProvider = ({ children }) => {

  const textAreaRef = useRef(null);

  const focusTextarea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <TextareaContext.Provider value={{ textAreaRef, focusTextarea }}>
      {children}
    </TextareaContext.Provider>
  );
};

export default TextareaContext;