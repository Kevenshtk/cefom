import axios from 'axios';

export const buscarCep = async (cep) => {
  try {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return { success: false, message: 'CEP inválido' };
    }

    const response = await axios.get(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    );

    if (response.data.erro) {
      return { success: false, message: 'CEP não encontrado' };
    }

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: 'Erro ao buscar CEP' };
  }
};
