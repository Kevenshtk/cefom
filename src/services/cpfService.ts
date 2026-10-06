import api from './api';
import type { InscricaoApiStatus } from '../types/api/inscricao.types';

const buscarCpf = async (cpf: string): Promise<InscricaoApiStatus> => {
  const response = await api.post(
    '/adolescentes/inscricoes/status',
    { cpf }
  );

  return response.data;
};

export default buscarCpf;