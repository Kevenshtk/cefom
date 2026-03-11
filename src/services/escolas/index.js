import api from '../api';

const handleError = (error, defaultMessage) => ({
  success: false,
  message: error.response?.data?.message || defaultMessage,
});

const buildEndedreco = (data) => ({
  cep: data.cep,
  logradouro: data.logradouro,
  numero: data.numero,
  complemento: data.complemento || null,
  bairro: data.bairro,
  cidade: data.cidade,
  estado: data.estado,
});

const getEscolas = async (pageCurrent) => {
  try {
    const response = await api.get('/escolas', {
      params: {
        page: pageCurrent ?? 1,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar escolas');
  }
};

const getEscolaById = async (id) => {
  try {
    const response = await api.get(`/escolas/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar escola');
  }
};

const addEscola = async (data) => {
  try {
    await api.post('/escolas', {
      nome: data.nome,
      tipo: data.tipo,
      endereco: buildEndedreco(data),
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao adicionar escola');
  }
};

const putEscola = async (id, data) => {
  try {
    await api.put(`/escolas/${id}`, {
      nome: data.nome,
      tipo: data.tipo,
      endereco: buildEndedreco(data),
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao atualizar escola');
  }
};

const deleteEscola = async (id) => {
  try {
    await api.delete(`/escolas/${id}`);

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao deletar escola');
  }
};

const escolaServices = {
  get: getEscolas,
  getById: getEscolaById,
  add: addEscola,
  put: putEscola,
  del: deleteEscola,
};

export default escolaServices;
