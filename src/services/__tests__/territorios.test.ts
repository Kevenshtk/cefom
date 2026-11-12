import api from '../api';
import territorioServices from '../territorios';

import axios, { AxiosError } from 'axios';
import type { ErrorResponse } from '../../types/services/global.types';

jest.mock('../api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mockedApi = api as jest.Mocked<typeof api>;

describe('territoriosService', () => {
  const requestError = new Error('Erro na requisição');

  const territoriosListInfo = [
    {
      idTerritorio: 1,
      territorio: 'território 1',
    },
    {
      idTerritorio: 2,
      territorio: 'território 2',
    },
    {
      idTerritorio: 3,
      territorio: 'território 3',
    },
  ];

  const territorioInfo = {
    idTerritorio: 1,
    territorio: 'território 1',
    bairros: ['bairro 1', 'bairro 2', 'bairro 3'],
  };

  const dataForm = {
    nome: 'território 1',
  };

  describe('get e getById', () => {
    it('deve retornar uma lista com os territórios', async () => {
      mockedApi.get.mockResolvedValueOnce({ data: territoriosListInfo });

      const result = await territorioServices.get();

      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(mockedApi.get).toHaveBeenCalledWith('/territorios', {
        params: {
          page: 1,
        },
      });

      expect(result).toEqual({
        success: true,
        data: territoriosListInfo,
      });
    });

    it('deve retornar um erro quando falhar a busca por territórios', async () => {
      mockedApi.get.mockRejectedValueOnce(requestError);

      const result = await territorioServices.get();

      expect(mockedApi.get).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar territórios',
      });
    });

    it('deve retornar os detalhes de um território', async () => {
      mockedApi.get.mockResolvedValueOnce({ data: territorioInfo });

      const result = await territorioServices.getById('1');

      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(mockedApi.get).toHaveBeenCalledWith('/territorios/1');

      expect(result).toEqual({
        success: true,
        data: territorioInfo,
      });
    });

    it('deve retornar um erro quando falhar a busca por territórios', async () => {
      mockedApi.get.mockRejectedValueOnce(requestError);

      const result = await territorioServices.getById('1');

      expect(mockedApi.get).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar território',
      });
    });
  });

  describe('add', () => {
    it('deve retornar success true ao cadastrar um território', async () => {
      mockedApi.post.mockResolvedValueOnce({ data: territorioInfo });

      const result = await territorioServices.add(dataForm);

      expect(mockedApi.post).toHaveBeenCalledTimes(1);
      expect(mockedApi.post).toHaveBeenCalledWith('/territorios', {
        territorio: dataForm.nome,
      });

      expect(result).toEqual({ success: true });
    });

    it('deve retornar um erro quando o território já foi cadastrado', async () => {
      const error = new AxiosError<ErrorResponse>(
        'Request failed with status code 409',
        'ERR_BAD_REQUEST',
        undefined,
        undefined,
        {
          data: {
            message: 'Território já cadastrado.',
          },
          status: 409,
          statusText: 'Conflict',
          headers: {},
          config: {
            headers: new axios.AxiosHeaders(),
          },
        }
      );

      mockedApi.post.mockRejectedValueOnce(error);

      const result = await territorioServices.add(dataForm);

      expect(mockedApi.post).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        success: false,
        message: 'Território já cadastrado.',
      });
    });

    it('deve retornar um erro quando falhar ao cadastrar um território', async () => {
      mockedApi.post.mockRejectedValueOnce(requestError);

      const result = await territorioServices.add(dataForm);

      expect(mockedApi.post).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao adicionar território',
      });
    });
  });

  describe('put', () => {
    it('deve retornar success true ao atualizar um território', async () => {
      mockedApi.put.mockResolvedValueOnce({ data: territorioInfo });

      const result = await territorioServices.put('1', dataForm);

      expect(mockedApi.put).toHaveBeenCalledTimes(1);
      expect(mockedApi.put).toHaveBeenCalledWith('/territorios/1', {
        territorio: dataForm.nome,
      });

      expect(result).toEqual({ success: true });
    });

    it('deve retornar um erro quando falhar ao atualizar um território', async () => {
      mockedApi.put.mockRejectedValueOnce(requestError);

      const result = await territorioServices.put('1', dataForm);

      expect(mockedApi.put).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao atualizar território',
      });
    });
  });

  describe('del', () => {
    it('deve retornar success true ao deletar um território', async () => {
      mockedApi.delete.mockResolvedValueOnce({ data: {} });

      const result = await territorioServices.del(1);

      expect(mockedApi.delete).toHaveBeenCalledTimes(1);
      expect(mockedApi.delete).toHaveBeenCalledWith('/territorios/1');

      expect(result).toEqual({ success: true });
    });

    it('deve retornar um erro quando falhar ao deletar um território', async () => {
      mockedApi.delete.mockRejectedValueOnce(requestError);

      const result = await territorioServices.del(1);

      expect(mockedApi.delete).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao deletar território',
      });
    });
  });

  describe('bairros', () => {
    const id = '1';
    const bairros = ['Centro', 'Jardim América'];

    it('deve atualizar os bairros do território', async () => {
      mockedApi.put.mockResolvedValueOnce({});

      const result = await territorioServices.putBairros(id, bairros);

      expect(mockedApi.put).toHaveBeenCalledTimes(1);
      expect(mockedApi.put).toHaveBeenCalledWith(`/territorios/${id}/bairros`, {
        bairros,
      });

      expect(result).toEqual({
        success: true,
      });
    });

    it('deve retornar erro quando não conseguir atualizar os bairros', async () => {
      mockedApi.put.mockRejectedValueOnce(new Error('Erro na requisição'));

      const result = await territorioServices.putBairros(id, bairros);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao atualizar bairro do território',
      });
    });

    it('deve adicionar um bairro ao território', async () => {
      mockedApi.get.mockResolvedValueOnce({ data: territorioInfo });
      mockedApi.put.mockResolvedValueOnce({});

      const result = await territorioServices.addBairro(id, 'Centro');

      expect(mockedApi.get).toHaveBeenCalledTimes(1);

      expect(mockedApi.put).toHaveBeenCalledWith(`/territorios/${id}/bairros`, {
        bairros: ['bairro 1', 'bairro 2', 'bairro 3', 'Centro'],
      });

      expect(result).toEqual({
        success: true,
      });
    });

    it('deve retornar erro quando não conseguir buscar o território (add)', async () => {
      mockedApi.get.mockRejectedValueOnce(requestError);

      const result = await territorioServices.addBairro(id, 'Centro');

      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(mockedApi.put).not.toHaveBeenCalled();

      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar território',
      });
    });

    it('deve remover um bairro ao território', async () => {
      mockedApi.get.mockResolvedValueOnce({ data: territorioInfo });
      mockedApi.put.mockResolvedValueOnce({});

      const result = await territorioServices.delBairro(id, 'bairro 3');

      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(mockedApi.put).toHaveBeenCalledWith(`/territorios/${id}/bairros`, {
        bairros: ['bairro 1', 'bairro 2'],
      });

      expect(result).toEqual({
        success: true,
      });
    });

    it('deve retornar erro quando não conseguir buscar o território (del)', async () => {
      mockedApi.get.mockRejectedValueOnce(requestError);

      const result = await territorioServices.delBairro(id, 'Centro');

      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(mockedApi.put).not.toHaveBeenCalled();

      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar território',
      });
    });
  });
});
