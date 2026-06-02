export const mapCpfData = (data) => ({
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
    uf: data.endereco.estado,
  },

  escolaridade: {
    idEscola: data.escolaridade.escola.idEscola,
    escola: data.escolaridade.escola.nome,
    serie: data.escolaridade.serie,
    periodo: data.escolaridade.periodo,
    ra: data.escolaridade.raEscolar,
    curso: data.escolaridade.curso,
  },

  telefones: {
    adolescente: data.telefones.telefoneAdolescente.numero,
    responsavel: data.telefones.telefoneResponsavel.numero,
    extra: data.telefones.telefoneExtra?.numero,
  },
});