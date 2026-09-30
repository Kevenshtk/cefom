export interface EscolaListItem {
    idEscola: number;
    nome: string;
}

export interface EscolaApiList {
    content: EscolaListItem[];
}

export interface EscolaEdereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface EscolaApiEndereco extends EscolaEdereco {
  idEndereco: number;
  territorio: string;
}

export interface EscolaApiDetails {
  idEscola: number;
  nome: string;
  tipo: string;
  endereco: EscolaApiEndereco;
}