import { useState } from 'react';

import buscarCpf from '../services/cpfService';
import { mapCpfData } from '../services/mappers/cpfMapper';

import type { CpfStatus, GetCpfSuccess, GetCpfError } from '../types/cpf.types';

const messages: Record<CpfStatus, string> = {
  NOVO: 'CPF não cadastrado. Preencha o formulário.',
  CRIAR: 'CPF encontrado. Dados carregados.',
  ATIVO: 'Este adolescente já possui uma inscrição ativa.',
};

export const useCpf = () => {
  const [loading, setLoading] = useState(false);

  const getCpf = async (cpf: string): Promise<GetCpfSuccess | GetCpfError> => {
    try {
      setLoading(true);
      const result = await buscarCpf(cpf);

      return {
        success: true,
        status: result.status,
        message: messages[result.status],
        data:
          result.status === 'CRIAR'
            ? mapCpfData(result.dadosUltimaInscricao)
            : null,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao buscar CPF.',
      };
    } finally {
      setLoading(false);
    }
  };

  return { getCpf, loading };
};
