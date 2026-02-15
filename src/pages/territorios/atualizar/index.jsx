import { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { TerritoriosContext } from '../../../context/territorios';

const AtualizarTerritorio = () => {
  const { id } = useParams();
  const { territorio, buscarTerritorioPorId, atualizarTerritorio } =
    useContext(TerritoriosContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    buscarTerritorioPorId(id);
  }, [id]);

  useEffect(() => {
    if (territorio) {
      reset({
        nome: territorio.territorio,
      });
    }
  }, [territorio, reset]);

  const onSubmit = async (data) => {
    const result = await atualizarTerritorio(id, data.nome);

    if (result === true) navigate('/territorios');
  };

  return (
    <>
      <h1>Atualizar Território</h1>
      <button>Cancelar</button>

      <h2>Indentificação</h2>
      <span>Id: {id}</span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="data">Data da Atualização</label>
        <Controller
          name="data"
          control={control}
          render={({ field }) => <input type="date" {...field} />}
        />

        <label htmlFor="nome">Nome do Território</label>
        <Controller
          name="nome"
          control={control}
          render={({ field }) => <input type="text" {...field} />}
        />

        <button type="submit">Salvar</button>
      </form>

      <span>Bairros:</span>
      <Link to={`/territorios/atualizar/bairro/${id}`}>Atualizar Bairros</Link>
    </>
  );
};

const AtualizarBairros = () => {
  return (
    <>
      <h1>Atualizar Bairros</h1>
      <button>Cancelar</button>
      <span>Id: </span>
      <span>Nome: </span>

      <form action="">
        <label htmlFor="">Data da Atualização</label>
        <input type="date" name="" id="" />
        <label htmlFor="">Bairro</label>
        <input type="text" name="" id="" />
        <button>Salvar</button>
      </form>
    </>
  );
};

export { AtualizarTerritorio, AtualizarBairros };
