import type { EscolaApiList, EscolaApiDetails, EscolaEdereco } from '../api/escolas.types';

export interface ErrorResponse {
  message?: string;
}

export interface ServiceError {
  success: false;
  message: string;
}

export interface ServiceSuccess<T> {
  success: true;
  data: T;
}

export interface CreateEscolaRequest {
  // data: string;
  nome: string;
  tipo: string;
  endereco: EscolaEdereco;
}

export type EscolaListResponse = ServiceSuccess<EscolaApiList> | ServiceError;
export type EscolaDetailsResponse =
  | ServiceSuccess<EscolaApiDetails>
  | ServiceError;
export type CreateEscolaResponse = { success: true } | ServiceError;
export type UpdateEscolaResponse = CreateEscolaResponse;
export type DeleteEscolaResponse = CreateEscolaResponse;