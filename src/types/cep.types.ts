import type { ServiceError, ServiceSuccess } from './services/global.types';

export interface CepApiDetails {
  cep: string;
  bairro: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

export type CepResponse = ServiceSuccess<CepApiDetails> | ServiceError;
