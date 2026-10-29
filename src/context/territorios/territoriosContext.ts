import { createContext } from 'react';

import type { TerritoriosContextType } from '../../types/context/territorios.types';
import type {
  TerritorioListItem,
  TerritorioApiDetails,
} from '../../types/api/territorios.types';
import type { TerritorioFormData } from '../../services/territorios';

export const TerritoriosContext = createContext<TerritoriosContextType<
  TerritorioListItem,
  TerritorioApiDetails,
  TerritorioFormData
> | null>(null);
