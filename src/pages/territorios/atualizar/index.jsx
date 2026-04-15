import { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { TerritoriosContext } from '../../../context/territorios';
import alert from '../../../utils/alert';
import Button from '../../../components/Button';

const inputClass = "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:bg-surface-2 disabled:text-text-secondary";
const labelClass = "block text-sm font-medium text-text-primary mb-1 mt-4";
const errorClass = "text-red-500 text-xs mt-1 block";

const AtualizarTerritorio = () => {
  const { id } = useParams();
  const { item, getById, update } = useContext(TerritoriosContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    getById(id);
  }, [id]);

  useEffect(() => {
    if (item) {
      reset({
        nome: item.territorio,
      });
    }
  }, [item, reset]);

  const onSubmit = async (data) => {
    const result = await alert.update();

    if (result.isConfirmed) {
      const result = await update(id, data.nome);
      if (result === true) navigate('/territorios');
    } else if (result.isDismissed) {
      navigate('/territorios');
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link to="/territorios" className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
        <i className="fa-solid fa-arrow-left" /> Voltar
      </Link>

      <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-text-primary">Atualizar Território</h1>
          <span className="text-sm text-text-secondary bg-surface-2 px-3 py-1 rounded-full font-medium">ID: {id}</span>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 border-b border-border pb-8">
          <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">Identificação</h2>

          <label htmlFor="data" className={labelClass}>Data da Atualização</label>
          <Controller
            name="data"
            control={control}
            render={({ field }) => <input className={inputClass} id="data" type="date" {...field} />}
          />

          <label htmlFor="nome" className={labelClass}>Nome do Território</label>
          <Controller
            name="nome"
            control={control}
            rules={{
              validate: (value) =>
                value.trim() !== item?.territorio?.trim() ||
                'O nome do território deve ser diferente do atual',
            }}
            render={({ field }) => (
              <>
                <input className={inputClass} id="nome" type="text" {...field} />
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

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Bairros Relacionados</h2>
            <Link 
              to={`/territorios/atualizar/${id}/bairro`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-blue-700 transition-colors"
            >
              <i className="fa-solid fa-plus" /> Adicionar / Editor
            </Link>
          </div>
          
          <ul className="flex flex-col gap-2">
            {item?.bairros?.map((bairro) => (
              <li key={bairro} className="bg-background border border-border px-4 py-2 rounded-md text-sm text-text-primary">
                {bairro}
              </li>
            ))}
            {!item?.bairros?.length && <p className="text-sm text-text-secondary">Nenhum bairro cadastrado.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

const AtualizarBairros = () => {
  const { id } = useParams();
  const { item, adicionarBairro, deletarBairro } = useContext(TerritoriosContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = (data) => {
    const result = adicionarBairro(id, data.bairro);
    if (result) reset();
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link to={`/territorios/atualizar/${id}`} className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
        <i className="fa-solid fa-arrow-left" /> Voltar para Território
      </Link>

      <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-text-primary">Atualizar Bairros</h1>
          <span className="text-sm text-text-secondary bg-surface-2 px-3 py-1 rounded-full font-medium">Território: {item?.territorio}</span>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 border-b border-border pb-8">
          <label htmlFor="data" className={labelClass}>Data da Atualização</label>
          <Controller
            name="data"
            control={control}
            render={({ field }) => <input className={inputClass} id="data" type="date" {...field} />}
          />

          <label htmlFor="bairro" className={labelClass}>Bairro</label>
          <Controller
            name="bairro"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <>
                <input className={inputClass} id="bairro" type="text" {...field} placeholder="Digite o nome do bairro" />
                {errors.bairro && <span className={errorClass}>{errors.bairro.message}</span>}
              </>
            )}
          />

          <div className="mt-8 flex justify-end">
             <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adicionando...' : 'Adicionar Bairro'}
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Gerenciar Bairros</h2>
          <ul className="flex flex-col gap-2">
            {item?.bairros?.map((bairro) => (
              <li key={bairro} className="flex justify-between items-center bg-background border border-border px-4 py-2 rounded-md text-sm text-text-primary">
                {bairro}
                <button 
                  type="button" 
                  onClick={() => deletarBairro(id, bairro)}
                  className="text-red-500 hover:text-red-700 transition-colors w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50"
                  aria-label="Deletar bairro"
                >
                  <i className="fa-solid fa-trash-can text-sm" />
                </button>
              </li>
            ))}
            {!item?.bairros?.length && <p className="text-sm text-text-secondary">Nenhum bairro cadastrado.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { AtualizarTerritorio, AtualizarBairros };
