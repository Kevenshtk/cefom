import axios from 'axios';
import api from '../api';

import type {
  ServiceError,
  ErrorResponse,
  CreateEscolaRequest,
  EscolaListResponse,
  EscolaDetailsResponse,
  CreateEscolaResponse,
  UpdateEscolaResponse,
  DeleteEscolaResponse,
} from '../../types/services/escolas.types';
import type { EscolaEdereco, EscolaApiList, EscolaApiDetails } from '../../types/api/escolas.types';

interface EscolaFormData {
  nome: string;
  tipo: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
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

const buildEndedreco = (data: EscolaFormData): EscolaEdereco => ({
  cep: data.cep,
  logradouro: data.logradouro,
  numero: data.numero,
  complemento: data.complemento || null,
  bairro: data.bairro,
  cidade: data.cidade,
  estado: data.estado,
});

const getEscolas = async (pageCurrent: number): Promise<EscolaListResponse> => {
  try {
    const response = await api.get<EscolaApiList>('/escolas', {
      params: {
        page: pageCurrent ?? 1,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar escolas');
  }
};

const getEscolaById = async (id: number): Promise<EscolaDetailsResponse> => {
  try {
    const response = await api.get<EscolaApiDetails>(`/escolas/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar escola');
  }
};

const addEscola = async (data: EscolaFormData): Promise<CreateEscolaResponse> => {
  try {
    const payload: CreateEscolaRequest = {
      nome: data.nome,
      tipo: data.tipo,
      endereco: buildEndedreco(data),
    }

    await api.post<EscolaApiDetails>('/escolas', payload);

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao adicionar escola');
  }
};

const putEscola = async (id: number, data: EscolaFormData): Promise<UpdateEscolaResponse> => {
  try {
    const payload: CreateEscolaRequest = {
      nome: data.nome,
      tipo: data.tipo,
      endereco: buildEndedreco(data),
    }

    await api.put<EscolaApiDetails>(`/escolas/${id}`, payload);

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao atualizar escola');
  }
};

const deleteEscola = async (id: number): Promise<DeleteEscolaResponse> => {
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
