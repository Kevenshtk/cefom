import api from '../api';

const territirioServices = {
  get: () => getTerritorios(),
  getById: (id) => getTerritorioById(id),
  add: (datas) => addTerritorio(datas),
  put: (id, datas) => putTerritorio(id, datas),
  del: (id) => deleleTerritorio(id),
};

const getTerritorios = async () => {
  try {
    const response = await api.get('/territorios');
    return { status: response.status, data: response.data.content };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Erro ao buscar territirios',
    };
  }
};

const getTerritorioById = async (id) => {
  try {
    const response = await api.get(`/territorios/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Erro ao buscar territirio',
    };
  }
};

const addTerritorio = async (datas) => {
  try {
    const response = await api.post('/territorios', {
      territorio: datas,
    });

    return { status: response.status };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Erro ao adicionar territirios',
    };
  }
};

const putTerritorio = async (id, datas) => {
  try {
    const response = await api.put(`territorios/${id}`,{
      territorio: datas,
    });

    return { status: response.status };
  } catch (error) {
    return {
      status: error.response.status || 500,
      message: error.response.data.message || 'Erro ao atualizar territirios',
    }
  }
};

const deleleTerritorio = async (id) => {
  try {
    const response = await api.delete(`/territorios/${id}`);

    return { status: response.status };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Erro ao deletar territirios',
    };
  }
};

export default territirioServices;
