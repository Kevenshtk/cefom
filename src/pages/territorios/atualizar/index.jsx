import { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { TerritoriosContext } from '../../../context/territorios';

import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Deseja salvar as alterações?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não Salvar`,
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await atualizarTerritorio(id, data.nome);
        if (result === true) navigate('/territorios');
      } else if (result.isDenied) {
        Swal.fire('As alterações não são salvas.', '', 'info');
      } else if (result.isDismissed) {
        navigate('/territorios');
      }
    });
  };

  return (
    <>
      <h1>Atualizar Território</h1>
      <Link to="/territorios">Voltar</Link>

      <h2>Indentificação</h2>
      <span>Id: {id}</span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="data">Data da Atualização</label>
        <Controller
          name="data"
          control={control}
          render={({ field }) => <input id='data' type="date" {...field} />}
        />

        <label htmlFor="nome">Nome do Território</label>
        <Controller
          name="nome"
          control={control}
          rules={{
            validate: (value) =>
              value.trim() !== territorio.territorio.trim() ||
              'O nome do território deve ser diferente do atual',
          }}
          render={({ field }) => {
            return (
              <>
                <input id='nome' type="text" {...field} />
                {errors.nome && <span>{errors.nome.message}</span>}
              </>
            );
          }}
        />

        <button type="submit">{isSubmitting ? 'Salvando...' : 'Salvar'}</button>
      </form>

      <span>Bairros:</span>
      <Link to={`/territorios/atualizar/${id}/bairro`}>Atualizar Bairros</Link>
      <ul>
        {territorio?.bairros?.map((bairro) => (
          <li key={bairro}>{bairro}</li>
        ))}
      </ul>
    </>
  );
};

const AtualizarBairros = () => {
  const { id } = useParams();
  const { territorio, adicionarBairro, deletarBairro } =
    useContext(TerritoriosContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    Swal.fire({
      title: 'Deseja adicionar o bairro?',
      showDenyButton: true,
      confirmButtonColor: '#21be28',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      denyButtonText: `Não, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        adicionarBairro(id, data.bairro);
        reset();
      } else if (result.isDenied) {
        Swal.fire('O bairro não foi adicionado.', '', 'info');
      }
    });
  };

  return (
    <>
      <h1>Atualizar Bairros</h1>
      <Link to={`/territorios/atualizar/${id}`}>Voltar</Link>
      <span>Id: {id}</span>
      <span>Nome: {territorio?.territorio}</span>
      <span>Bairros:</span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="data">Data da Atualização</label>
        <Controller
          name="data"
          control={control}
          render={({ field }) => <input id='data' type="date" {...field} />}
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
                <input id='bairro' type="text" {...field} />
                {errors.bairro && <span>{errors.bairro.message}</span>}
              </>
            );
          }}
        />

        <button type="submit">
          {isSubmitting ? 'Adicionando...' : 'Adicionar Bairro'}
        </button>
      </form>

      <ul>
        {territorio?.bairros?.map((bairro) => {
          return (
            <div key={bairro}>
              <li>{bairro}</li>
              <button type="button" onClick={() => deletarBairro(id, bairro)}>
                x
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export { AtualizarTerritorio, AtualizarBairros };
