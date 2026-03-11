import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useContext, useEffect } from 'react';

import { EscolasContext } from '../../../context/escolas';

import Swal from 'sweetalert2';

const AtualizarEscola = () => {
  const { id } = useParams();
  const { escola, buscarEscolaPorId, atualizarEscola } =
    useContext(EscolasContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    buscarEscolaPorId(id);
  }, [id]);

  useEffect(() => {
    if (escola) {
      reset({
        nome: escola.nome,
        tipo: escola.tipo,
        cep: escola.endereco?.cep,
        logradouro: escola.endereco?.logradouro,
        numero: escola.endereco?.numero,
        complemento: escola.endereco?.complemento,
        bairro: escola.endereco?.bairro,
        cidade: escola.endereco?.cidade,
        estado: escola.endereco?.estado,
      });
    }
  }, [escola, reset]);

  const onSubmit = async (datas) => {
    Swal.fire({
      title: 'Deseja salvar as alterações?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não Salvar`,
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await atualizarEscola(id, datas);
        if (result === true) navigate('/escolas');
      } else if (result.isDenied) {
        Swal.fire('As alterações não foram salvas.', '', 'info');
      } else if (result.isDismissed) {
        navigate('/escolas');
      }
    });
  };

  return (
    <>
      <h1>Cadastro de Escola</h1>
      <Link to="/escolas">Voltar</Link>
      <h2>Identificação</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="data">Data do Cadastro</label>
        <Controller
          name="data"
          control={control}
          render={({ field }) => <input id="data" type="date" {...field} />}
        />

        <label htmlFor="nome">Nome</label>
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => {
            return (
              <>
                <input
                  id="nome"
                  type="text"
                  placeholder="Dom Henrique Mourão"
                  {...field}
                />
                {errors.nome && <span>{errors.nome.message}</span>}
              </>
            );
          }}
        />

        <label htmlFor="tipo">Tipo</label>
        <Controller
          name="tipo"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => {
            return (
              <>
                <select id="tipo" {...field}>
                  <option value=""></option>
                  <option value="Pública">Pública</option>
                  <option value="Particular">Particular</option>
                </select>
                {errors.tipo && <span>{errors.tipo.message}</span>}
              </>
            );
          }}
        />

        <h2>Endereço</h2>
        <label htmlFor="cep">CEP</label>
        <Controller
          name="cep"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => {
            return (
              <>
                <input
                  id="cep"
                  type="text"
                  placeholder="16401-320"
                  {...field}
                />
                {errors.cep && <span>{errors.cep.message}</span>}
              </>
            );
          }}
        />

        <button>Buscar</button>

        <label htmlFor="logradouro">Logradouro</label>
        <Controller
          name="logradouro"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => {
            return (
              <>
                <input
                  id="Logradouro"
                  type="text"
                  placeholder="Rua Santos Dumont"
                  {...field}
                />
                {errors.logradouro && <span>{errors.logradouro.message}</span>}
              </>
            );
          }}
        />

        <label htmlFor="numero">Número</label>
        <Controller
          name="numero"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => {
            return (
              <>
                <input id="numero" type="text" placeholder="551" {...field} />
                {errors.numero && <span>{errors.numero.message}</span>}
              </>
            );
          }}
        />

        <label htmlFor="complemento">Complemento</label>
        <Controller
          name="complemento"
          control={control}
          defaultValue=""
          render={({ field }) => {
            return (
              <>
                <input id="complemento" type="text" {...field} />
                {errors.complemento && (
                  <span>{errors.complemento.message}</span>
                )}
              </>
            );
          }}
        />

        <label htmlFor="bairro">Bairro</label>
        <Controller
          name="bairro"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => {
            return (
              <>
                <input
                  id="bairro"
                  type="text"
                  placeholder="Bairro"
                  {...field}
                />
                {errors.bairro && <span>{errors.bairro.message}</span>}
              </>
            );
          }}
        />

        <label htmlFor="cidade">Cidade</label>
        <Controller
          name="cidade"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => {
            return (
              <>
                <input id="cidade" type="text" placeholder="Lins" {...field} />
                {errors.cidade && <span>{errors.cidade.message}</span>}
              </>
            );
          }}
        />

        <label htmlFor="estado">Estado</label>
        <Controller
          name="estado"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => {
            return (
              <>
                <input id="estado" type="text" placeholder="SP" {...field} />
                {errors.estado && <span>{errors.estado.message}</span>}
              </>
            );
          }}
        />

        <button type="submit">{isSubmitting ? 'Salvando...' : 'Salvar'}</button>
      </form>
    </>
  );
};

export default AtualizarEscola;
