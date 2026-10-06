import axios from 'axios';
import api from '../api';

import type { InscricaoApiDetails } from '../../types/api/inscricao.types';
import type { ServiceError, ErrorResponse } from '../../types/services/global.types';
import type {
  BuildRequestFormData,
  CreateInscricaoResponse,
} from '../../types/services/inscricao.types';

interface InscricaoFormData {
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string | null;
  cpf: string;
  curso: string;
  dataInscricao: string;
  dataNascimento: string;
  escola: string;
  estado: string;
  foto: File | null;
  genero: string;
  idEscola: number;
  logradouro: string;
  nome: string;
  numero: string;
  observacoes: string;
  periodo: string;
  ra: string;
  serie: string;
  telAdolescente: string;
  telExtra: string;
  telResponsavel: string;
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

const buildRequestForm = (data: InscricaoFormData): BuildRequestFormData => ({
  inscricao: {
    dataInscricao: data.dataInscricao,
    observacao: data.observacoes,
  },
  documento: {
    cpf: data.cpf,
  },
  adolescente: {
    nome: data.nome,
    genero: data.genero,
    dataNascimento: data.dataNascimento,
  },
  endereco: {
    cep: data.cep,
    logradouro: data.logradouro,
    numero: data.numero,
    complemento: data.complemento,
    bairro: data.bairro,
    cidade: data.cidade,
    estado: data.estado,
  },
  escolaridade: {
    idEscola: data.idEscola,
    serie: data.serie,
    periodo: data.periodo,
    raEscolar: data.ra,
    curso: data.curso,
  },
  telefones: {
    telefoneAdolescente: data.telAdolescente,
    telefoneResponsavel: data.telResponsavel,
    telefoneExtra: data.telExtra,
  },
});

const addInscricao = async (
  data: InscricaoFormData,
): Promise<CreateInscricaoResponse> => {
  try {
    const payload = buildRequestForm(data);

    const formData = new FormData();

    formData.append(
      'dados',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );

    if (data.foto) {
      formData.append('file', data.foto);
    }

    await api.post<InscricaoApiDetails>(
      '/adolescentes/inscricoes',
      formData
    );

    return {
      success: true,
      message: 'Inscrição realizada com sucesso.',
    };
  } catch (error) {
    return handleError(error, 'Erro ao realizar inscrição');
  }
};

const inscricaoService = {
  add: addInscricao,
};

export default inscricaoService;
