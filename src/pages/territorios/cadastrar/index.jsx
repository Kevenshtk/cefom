import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';

import { TerritoriosContext } from '../../../context/territorios';

const CadastroTerritorio = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const { adicionarTerritorio } = useContext(TerritoriosContext);

  const onSubmit = async (data) => {
    const result = await adicionarTerritorio(data.nome);

    if (result === true) reset();
  };

  return (
    <>
      <h1>Cadastro de Território</h1>
      <Link to="/territorios">Voltar</Link>
      <h2>Identificação</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="data">Data do Cadastro</label>
        <Controller
         name='data'
         control={control}
         render={({ field }) => (
          <input type="date" {...field}/>
         )}/>
        

        <label htmlFor="nome">Nome do Território</label>
        <Controller
          name="nome"
          control={control}
          defaultValue=''
          render={({ field }) => (
            <input type="text" placeholder="CRAS Miguel Padeiro" {...field} />
          )}
        />
        <button type="submit">Salvar</button>
      </form>
    </>
  );
};

export default CadastroTerritorio;
