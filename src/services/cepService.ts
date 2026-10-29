import axios from 'axios';
import type { CepApiDetails, CepResponse } from '../types/cep.types';

export const buscarCep = async (cep: string): Promise<CepResponse> => {
  try {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return { success: false, message: 'CEP inválido' };
    }

    const response = await axios.get<CepApiDetails>(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    );

    if (!response.data) {
      return { success: false, message: 'CEP não encontrado' };
    }

    return { success: true, data: response.data };
  } catch {
    return { success: false, message: 'Erro ao buscar CEP' };
  }
};
