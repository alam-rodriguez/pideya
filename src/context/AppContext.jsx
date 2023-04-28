// Reatc
import { createContext, useState } from 'react';

// Context
export const AppContext = createContext();

const AppContextProvider = ({children}) => {

  // Color principal
  const [color1, setColor1] = useState({
    bgColor    : 'bg-success',
    textColor  : 'text-success',
    btnOutline : 'btn-outline-success',
  });
  // const [color1, setColor1] = useState('bg-success');
  // const [color1Text, setColor1Text] = useState('text-success');
  // const [color1BtnOutline, setColor1BtnOutline] = useState('btn-outline-success');

  const [articleSeleted, setArticleSeleted] = useState(null);


  return(
    <AppContext.Provider 
      value={{
        color1,
        articleSeleted, setArticleSeleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}


export default AppContextProvider;