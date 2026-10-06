import type { EscolaApiEndereco, EscolaListItem } from './escolas.types';

interface InscricaoFoto {
  IdFotoAdolescente: number;
  nomeArquivo: string;
  tipoArquivo: string;
  tamanho: number;
  fileDownloadUri: string;
}

interface InscricaoDocumento {
  idDocumento: number;
  cpf: string;
}

interface InscricaoAdolescente {
  idAdolescente: number;
  nome: string;
  genero: string;
  dataNascimento: string;
  idade: number;
  situacao: string;
}

interface InscriacaoEscolaridade {
  idEscolaridade: number;
  escola: EscolaListItem;
  serie: string;
  periodo: string;
  raEscolar: string;
  curso: string;
}

interface InscriacaoTelefone {
  idTelefone: number;
  numero: string;
  titular: string;
}

export interface InscricaoListItem {
  idInscricao: number;
  numInscricao: number;
  observacao: string;
  dataInscricao: string;
  dataFinalizacao: string | null;
  motivoFinalizacao: string | null;
  foto: InscricaoFoto;
  documento: InscricaoDocumento;
  adolescente: InscricaoAdolescente;
  endereco: EscolaApiEndereco;
  escolaridade: InscriacaoEscolaridade;
  telefones: {
    telefoneAdolescente: InscriacaoTelefone;
    telefoneResponsavel: InscriacaoTelefone;
    telefoneExtra?: InscriacaoTelefone;
  };
}

export interface InscricaoApiStatus {
  status: string;
  dadosUltimaInscricao: {
    inscricao: number | null; // talvez possa ser o ID da inscrição
    documento: InscricaoDocumento;
    adolescente: InscricaoAdolescente;
    endereco: EscolaApiEndereco;
    escolaridade: InscriacaoEscolaridade;
    telefones: {
      telefoneAdolescente: InscriacaoTelefone;
      telefoneResponsavel: InscriacaoTelefone;
      telefoneExtra?: InscriacaoTelefone;
    };
  };
}

export interface InscricaoApiDetails {
  adolescente: InscricaoAdolescente;
  documento: InscricaoDocumento;
  endereco: EscolaApiEndereco;
  escolaridade: InscriacaoEscolaridade;
  instricao: {
    dataInscricao: string;
    dataFinalizacao: string | null;
    foto: InscricaoFoto;
    idInscricao: number;
    motivoFinalizacao: string | null;
    numInscricao: number;
    observacao: string | null;
  };
  telefones: {
    telefoneAdolescente: InscriacaoTelefone;
    telefoneResponsavel: InscriacaoTelefone;
    telefoneExtra?: InscriacaoTelefone;
  };
}
