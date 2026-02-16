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

const territorioServices = {
  get: getTerritorios,
  getById: (id) => getTerritorioById(id),
  add: (datas) => addTerritorio(datas),
  put: (id, datas) => putTerritorio(id, datas),
  del: (id) => deleteTerritorio(id),
};

export default territorioServices;
