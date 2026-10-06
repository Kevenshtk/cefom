import type { ServiceError } from './global.types';

export interface ErrorResponse {
  message?: string;
}

export interface BuildRequestFormData {
  inscricao: {
    dataInscricao: string;
    observacao: string;
  };
  documento: {
    cpf: string;
  };
  adolescente: {
    nome: string;
    genero: string;
    dataNascimento: string;
  };
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cidade: string;
    estado: string;
  };
  escolaridade: {
    idEscola: number;
    serie: string;
    periodo: string;
    raEscolar: string;
    curso: string;
  };
  telefones: {
    telefoneAdolescente: string;
    telefoneResponsavel: string;
    telefoneExtra?: string;
  };
}

export type CreateInscricaoResponse =
  | { success: true; message: string }
  | ServiceError;
