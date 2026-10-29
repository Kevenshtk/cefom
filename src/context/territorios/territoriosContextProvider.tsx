import { useCrud } from '../../hooks/useCrud';
import territorioServices from '../../services/territorios';
import { TerritoriosContext } from './territoriosContext';

import type { ProviderProps } from '../../types/context/global.types';

import type {
  TerritorioListItem,
  TerritorioApiDetails,
} from '../../types/api/territorios.types';
import type { TerritorioFormData } from '../../services/territorios';


export const TerritoriosContextProvider = ({ children }: ProviderProps) => {
  const crud = useCrud<TerritorioListItem, TerritorioApiDetails, TerritorioFormData>(territorioServices);

  const adicionarBairro = async (id: string, bairro: string): Promise<boolean> => {
    return await crud.handleAction(
      () => territorioServices.addBairro(id, bairro),
      'Bairro adicionado com sucesso!',
      () => crud.getById(id)
    );
  };

  const deletarBairro = async (id: string, bairro: string): Promise<boolean> => {
    return await crud.handleAction(
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