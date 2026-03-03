import api from '../api';

const handleError = (error, defaultMessage) => ({
  success: false,
  message: error.response?.data?.message || defaultMessage,
});

const getTerritorios = async () => {
  try {
    const response = await api.get('/territorios');
    return { success: true, data: response.data.content };
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

const addTerritorio = async (datas) => {
  try {
    await api.post('/territorios', {
      territorio: datas,
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao adicionar território');
  }
};

const putTerritorio = async (id, datas) => {
  try {
    await api.put(`/territorios/${id}`, {
      territorio: datas,
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
  getById: (id) => getTerritorioById(id),
  add: (datas) => addTerritorio(datas),
  put: (id, datas) => putTerritorio(id, datas),
  del: (id) => deleteTerritorio(id),
  addBairro: (id, data) => addBairro(id, data),
  delBairro: (id, data) => deleteBairro(id, data),
};

export default territorioServices;
