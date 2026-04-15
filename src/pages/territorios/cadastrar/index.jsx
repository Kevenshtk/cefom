import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';

import { TerritoriosContext } from '../../../context/territorios';
import Button from '../../../components/Button';

const CadastroTerritorio = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const { add } = useContext(TerritoriosContext);

  const onSubmit = async (data) => {
    const result = await add(data.nome);

    if (result) reset();
  };

  const inputClass = "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:bg-surface-2 disabled:text-text-secondary";
  const labelClass = "block text-sm font-medium text-text-primary mb-1 mt-4";
  const errorClass = "text-red-500 text-xs mt-1 block";

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link to="/territorios" className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
        <i className="fa-solid fa-arrow-left" /> Voltar
      </Link>

      <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Cadastro de Território</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">Identificação</h2>

          <label htmlFor="data" className={labelClass}>Data do Cadastro</label>
          <Controller
            name="data"
            control={control}
            render={({ field }) => <input className={inputClass} id='data' type="date" {...field} />}
          />

          <label htmlFor="nome" className={labelClass}>Nome do Território</label>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <>
                <input
                  className={inputClass}
                  id='nome'
                  type="text"
                  placeholder="CRAS Miguel Padeiro"
                  {...field}
                />
                {errors.nome && <span className={errorClass}>{errors.nome.message}</span>}
              </>
            )}
          />
          
          <div className="mt-8 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroTerritorio;
