import type {
  InscricaoApiStatus,
  InscricaoAdolescente,
  InscriacaoEscolaridade,
} from '../../types/api/inscricao.types';
import type { EscolaEdereco } from '../../types/api/escolas.types';

type DadosUltimaInscricao = InscricaoApiStatus['dadosUltimaInscricao'];

interface MappedCpfDataResponse {
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

export const mapCpfData = (
  data: DadosUltimaInscricao
): MappedCpfDataResponse => ({
  adolescente: {
    nome: data.adolescente.nome,
    dataNascimento: data.adolescente.dataNascimento,
    genero: data.adolescente.genero,
  },

  endereco: {
    cep: data.endereco.cep,
    logradouro: data.endereco.logradouro,
    numero: data.endereco.numero,
    complemento: data.endereco.complemento,
    bairro: data.endereco.bairro,
    cidade: data.endereco.cidade,
    estado: data.endereco.estado,
  },

  escolaridade: {
    idEscolaridade: data.escolaridade.idEscolaridade,
    idEscola: data.escolaridade.escola.idEscola,
    escola: data.escolaridade.escola.nome,
    serie: data.escolaridade.serie,
    periodo: data.escolaridade.periodo,
    raEscolar: data.escolaridade.raEscolar,
    curso: data.escolaridade.curso,
  },

  telefones: {
    adolescente: data.telefones.telefoneAdolescente.numero,
    responsavel: data.telefones.telefoneResponsavel.numero,
    extra: data.telefones.telefoneExtra?.numero,
  },
});
