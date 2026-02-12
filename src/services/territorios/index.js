import api from '../api';

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

export default getTerritorios;
