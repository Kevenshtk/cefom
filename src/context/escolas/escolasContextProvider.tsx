import { useCrud } from '../../hooks/useCrud';
import escolaServices from '../../services/escolas';
import { EscolasContext } from './escolasContext';

import type { ProviderProps } from '../../types/context/global.types';
import type {
  EscolaListItem,
  EscolaApiDetails,
} from '../../types/api/escolas.types';
import type { EscolaFormData } from '../../services/escolas';

export const EscolasContextProvider = ({ children }: ProviderProps) => {
  const crud = useCrud<EscolaListItem, EscolaApiDetails, EscolaFormData>(
    escolaServices
  );

  return (
    <EscolasContext.Provider value={crud}>{children}</EscolasContext.Provider>
  );
};
