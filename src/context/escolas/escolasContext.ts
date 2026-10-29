import { createContext } from 'react';

import type { EscolasContextType } from '../../types/context/escolas.types';
import type {
  EscolaListItem,
  EscolaApiDetails,
} from '../../types/api/escolas.types';
import type { EscolaFormData } from '../../services/escolas';

export const EscolasContext = createContext<EscolasContextType<
  EscolaListItem,
  EscolaApiDetails,
  EscolaFormData
> | null>(null);
