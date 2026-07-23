import api from '../api';

const handleError = (error, defaultMessage) => ({
  success: false,
  message: error.response?.data?.message || defaultMessage,
});

const buildRequestForm = (data) => ({
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

const addInscricao = async (data, file = null) => {
  try {
    const payload = buildRequestForm(data);

    const formData = new FormData();

    formData.append(
      'dados',
      new Blob(
        [JSON.stringify(payload)],
        { type: 'application/json' }
      )
    );

    if (file) {
      formData.append('file', file);
    }

    const response = await api.post(
      '/adolescentes/inscricoes',
      formData
    );

    return {
      success: true,
      message:
        response.data.message ||
        'Inscrição realizada com sucesso.',
    };
  } catch (error) {
    return handleError(
      error,
      'Erro ao realizar inscrição'
    );
  }
};

const inscricaoService = {
  add: addInscricao,
};

export default inscricaoService;
