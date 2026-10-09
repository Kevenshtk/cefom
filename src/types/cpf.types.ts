import type {
  InscricaoAdolescente,
  InscriacaoEscolaridade,
} from './api/inscricao.types';
import type { EscolaEdereco } from './api/escolas.types';

export interface MappedCpfDataResponse {
  adolescente: Pick<InscricaoAdolescente, 'nome' | 'dataNascimento' | 'genero'>;
  endereco: EscolaEdereco;
  escolaridade: Omit<InscriacaoEscolaridade, 'escola'> & {
    idEscola: number;
    escola: string;
  };
  telefones: {
    adolescente: string;
    responsavel: string;
    extra: string | undefined;
  };
}

export type CpfStatus = 'NOVO' | 'CRIAR' | 'ATIVO';

export interface GetCpfSuccess {
  success: true;
  status: CpfStatus;
  message: string;
  data: MappedCpfDataResponse | null;
}

export interface GetCpfError {
  success: false;
  message: string;
}
