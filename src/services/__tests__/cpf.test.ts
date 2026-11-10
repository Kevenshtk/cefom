import api from '../api';
import buscarCpf from '../cpfService';

jest.mock('../api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mockedApi = api as jest.Mocked<typeof api>;

describe('cpfService', () => {
  const cpf = '123.456.789-00';
  const cpfInfo = {
    status: 'CRIAR',
    dadosUltimaInscricao: {
      documento: {
        idDocumento: 1,
        cpf: '123.456.789-00',
      },
      adolescente: {
        idAdolescente: 1,
        nome: 'Rebeca Sousa Dias',
        genero: 'Feminino',
        dataNascimento: '2010-03-29',
        idade: 16,
        situacao: 'Matriculado',
      },
    },
  };

  it('deve retornar as informações do cpf', async () => {
    mockedApi.post.mockResolvedValueOnce({data : cpfInfo});

    const result = await buscarCpf(cpf);

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/adolescentes/inscricoes/status', {cpf});

    expect(result).toEqual(cpfInfo);
  });
});
