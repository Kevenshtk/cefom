import { useState, createContext } from 'react';
import territorioServices from '../services/territorios';
import { useCrud } from '../hooks/useCrud';

export const TerritoriosContext = createContext();

export const TerritoriosContextProvider = ({ children }) => {
  const crud = useCrud(territorioServices);

  const adicionarBairro = (id, bairro) => {
    crud.handleAction(
      () => territorioServices.addBairro(id, bairro),
      'Bairro adicionado com sucesso!',
      () => crud.getById(id)
    );
  };

  const deletarBairro = (id, bairro) => {
    crud.handleAction(
      () => territorioServices.delBairro(id, bairro),
      'Bairro removido com sucesso!',
      () => crud.getById(id)
    );
  };

  return (
    <TerritoriosContext.Provider
      value={{...crud,
        adicionarBairro,
        deletarBairro,
      }}
    >
      {children}
    </TerritoriosContext.Provider>
  );
};
