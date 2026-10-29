import { useContext } from 'react';
import { TerritoriosContext } from '../context/territorios/territoriosContext';

export function useTerritoriosContext() {
  const context = useContext(TerritoriosContext);

  if (!context) {
    throw new Error(
      'useTerritoriosContext deve ser usado dentro de TerritoriosContextProvider'
    );
  }

  return context;
}
