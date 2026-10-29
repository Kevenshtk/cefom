import { buscarCep } from '../services/cepService';
import alert from '../utils/alert';

import type { CepApiDetails } from '../types/cep.types';

export const useCep = () => {
  const getCep = async (cep: string): Promise<CepApiDetails | null> => {
    const result = await buscarCep(cep);

    if (result.success) {
      return {
        cep: result.data.cep,
        bairro: result.data.bairro,
        localidade: result.data.localidade,
        logradouro: result.data.logradouro,
        uf: result.data.uf,
      };
    } else {
      alert.error(result.message);
      return null;
    }
  };

  return { getCep };
};
