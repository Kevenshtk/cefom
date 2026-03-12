import api from '../api';

const handleError = (error, defaultMessage) => ({
  success: false,
  message: error.response?.data?.message || defaultMessage,
});

const getTerritorios = async (pageCurrent) => {
  try {
    const response = await api.get('/territorios',{
      params: {
        page: pageCurrent ?? 1,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar territórios');
  }
};

const getTerritorioById = async (id) => {
  try {
    const response = await api.get(`/territorios/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar território');
  }
};

const addTerritorio = async (data) => {
  try {
    await api.post('/territorios', {
      territorio: data,
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao adicionar território');
  }
};

const putTerritorio = async (id, data) => {
  try {
    await api.put(`/territorios/${id}`, {
      territorio: data,
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao atualizar território');
  }
};

const deleteTerritorio = async (id) => {
  try {
    await api.delete(`/territorios/${id}`);

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao deletar território');
  }
};

const updateBairro = async (id, bairros) => {
  try {
    await api.put(`/territorios/${id}/bairros`, {
      bairros: bairros,
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao atualizar bairro do território');
  }
};

const addBairro = async (id, data) => {
  const territorio = await getTerritorioById(id);

  if (!territorio.success) return territorio;

  const bairrosAtuais = territorio.data?.bairros;
  const novosBairros = [...bairrosAtuais, data];

  return await updateBairro(id, novosBairros);
};

const deleteBairro = async (id, data) => {
  const territorio = await getTerritorioById(id);

  if (!territorio.success) return territorio;

  const bairrosAtuais = territorio.data?.bairros;
  const novosBairros = bairrosAtuais.filter((b) => b !== data);

  return await updateBairro(id, novosBairros);
};

const territorioServices = {
  get: getTerritorios,
  getById: getTerritorioById,
  add: addTerritorio,
  put: putTerritorio,
  del: deleteTerritorio,
  addBairro: addBairro,
  delBairro: deleteBairro,
};

export default territorioServices;
