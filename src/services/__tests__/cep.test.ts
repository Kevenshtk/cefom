import axios from 'axios';
import { buscarCep } from '../cepService';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mockedApi = axios as jest.Mocked<typeof axios>;

describe('cepService', () => {
  const cep = '16430-548';
  const cepInfo = {
    cep: '16430-548',
    logradouro: 'Rua Helena Lucas Franco da Rocha',
    complemento: '',
    bairro: 'Martiniano Cruz',
    localidade: 'Guaiçara',
    uf: 'SP',
    estado: 'São Paulo',
  };

  it('deve retornar as informações do cep', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: cepInfo });

    const result = await buscarCep(cep);

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith(
      'https://viacep.com.br/ws/16430548/json/'
    );

    expect(result).toEqual({
      success: true,
      data: cepInfo,
    });
  });

  it('deve retornar erro quando o cep for inválido', async () => {
    const result = await buscarCep('16430-54');

    expect(result.success).toBe(false);

    if (result.success === false) {
      expect(result.message).toBe('CEP inválido');
    }

    expect(mockedApi.get).not.toHaveBeenCalled();
  });

  it('deve retornar erro quando o cep não for encontrado', async () => {
    mockedApi.get.mockResolvedValueOnce({ erro: 'true' });

    const result = await buscarCep('16430-000');

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith(
      'https://viacep.com.br/ws/16430000/json/'
    );

    expect(result).toEqual({
      success: false,
      message: 'CEP não encontrado',
    });
  });

  it('deve retornar erro quando a requisição falhar', async () => {
    mockedApi.get.mockRejectedValueOnce(new Error('Erro na requisição'));

    const result = await buscarCep(cep);

    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    
    expect(result).toEqual({
      success: false,
      message: 'Erro ao buscar CEP',
    })
  });
});
