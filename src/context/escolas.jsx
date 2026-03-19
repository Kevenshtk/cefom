import { createContext } from 'react';
import { useCrud } from '../hooks/useCrud';
import escolaServices from '../services/escolas';

export const EscolasContext = createContext();

export const EscolasContextProvider = ({ children }) => {
  const crud = useCrud(escolaServices);

  return (
    <EscolasContext.Provider
      value={crud}
    >
      {children}
    </EscolasContext.Provider>
  );
};
