import axios from 'axios';
import api from '../api';

import type {
  TerritorioApiList,
  TerritorioApiDetails,
} from '../../types/api/territorios.types';

import type {
  ServiceError,
  ErrorResponse,
  TerritorioListResponse,
  TerritorioDetailsResponse,
  CreateTerritorioResponse,
  UpdateTerritorioResponse,
  DeleteTerritorioResponse,
  UpdateBairroResponse,
} from '../../types/services/territorios.types';

interface TerritorioFormData {
  nome: string;
}

interface BairroFormData {
  bairro: string;
}

const handleError = (error: unknown, fallback: string): ServiceError => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return {
      success: false,
      message: error.response?.data?.message || fallback,
    };
  }

  return {
    success: false,
    message: fallback,
  };
};

const getTerritorios = async (
  pageCurrent: number
): Promise<TerritorioListResponse> => {
  try {
    const response = await api.get<TerritorioApiList>('/territorios', {
      params: {
        page: pageCurrent ?? 1,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar territórios');
  }
};

const getTerritorioById = async (
  id: number
): Promise<TerritorioDetailsResponse> => {
  try {
    const response = await api.get<TerritorioApiDetails>(`/territorios/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar território');
  }
};

const addTerritorio = async (
  data: TerritorioFormData
): Promise<CreateTerritorioResponse> => {
  try {
    await api.post<TerritorioApiDetails>('/territorios', {
      territorio: data,
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao adicionar território');
  }
};

const putTerritorio = async (
  id: number,
  data: TerritorioFormData
): Promise<UpdateTerritorioResponse> => {
  try {
    await api.put(`/territorios/${id}`, {
      territorio: data,
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao atualizar território');
  }
};

const deleteTerritorio = async (
  id: number
): Promise<DeleteTerritorioResponse> => {
  try {
    await api.delete(`/territorios/${id}`);

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao deletar território');
  }
};

const updateBairro = async (
  id: number,
  bairros: string[]
): Promise<UpdateBairroResponse> => {
  try {
    await api.put(`/territorios/${id}/bairros`, {
      bairros: bairros,
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao atualizar bairro do território');
  }
};

const addBairro = async (
  idTerritorio: number,
  data: BairroFormData
): Promise<UpdateBairroResponse> => {
  const territorio = await getTerritorioById(idTerritorio);

  if (!territorio.success) return territorio;

  const bairrosAtuais: string[] = territorio.data?.bairros ?? [];
  const novosBairros: string[] = [...bairrosAtuais, data.bairro];

  return await updateBairro(idTerritorio, novosBairros);
};

const deleteBairro = async (
  idTerritorio: number,
  data: string
): Promise<UpdateBairroResponse> => {
  const territorio = await getTerritorioById(idTerritorio);

  if (!territorio.success) return territorio;

  const bairrosAtuais: string[] = territorio.data?.bairros ?? [];
  const novosBairros: string[] = bairrosAtuais.filter((b) => b !== data);

  return await updateBairro(idTerritorio, novosBairros);
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
