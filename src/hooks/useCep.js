import { buscarCep } from '../services/cepService';
import alert from '../utils/alert';

export const useCep = () => {

  const getCep = async (cep) => {
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
