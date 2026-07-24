import api from './api';

const buscarCpf = async (cpf) => {
  const response = await api.post(
    '/adolescentes/inscricoes/status',
    { cpf }
  );

  return response.data;
};

export default buscarCpf;