import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useContext, useEffect } from 'react';

import { EscolasContext } from '../../../context/escolas';
import alert from '../../../utils/alert';
import Button from '../../../components/Button';

const AtualizarEscola = () => {
  const { id } = useParams();
  const { item, getById, update } = useContext(EscolasContext);
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
        nome: item.nome,
        tipo: item.tipo,
        cep: item.endereco?.cep,
        logradouro: item.endereco?.logradouro,
        numero: item.endereco?.numero,
        complemento: item.endereco?.complemento,
        bairro: item.endereco?.bairro,
        cidade: item.endereco?.cidade,
        estado: item.endereco?.estado,
      });
    }
  }, [item, reset]);

  const onSubmit = async (data) => {
    const result = await alert.update();

    if (result.isConfirmed) {
      const result = await update(id, data);
      if (result === true) navigate('/escolas');
    } else if (result.isDismissed) {
      navigate('/escolas');
    }
  };

  const inputClass = "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:bg-surface-2 disabled:text-text-secondary";
  const labelClass = "block text-sm font-medium text-text-primary mb-1 mt-4";
  const errorClass = "text-red-500 text-xs mt-1 block";

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link to="/escolas" className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
        <i className="fa-solid fa-arrow-left" /> Voltar
      </Link>

      <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Atualizar Escola</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">Identificação</h2>

          <label htmlFor="data" className={labelClass}>Data do Cadastro</label>
          <Controller
            name="data"
            control={control}
            render={({ field }) => <input className={inputClass} id="data" type="date" {...field} />}
          />

          <label htmlFor="nome" className={labelClass}>Nome</label>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <>
                <input
                  className={inputClass}
                  id="nome"
                  type="text"
                  placeholder="Dom Henrique Mourão"
                  {...field}
                />
                {errors.nome && <span className={errorClass}>{errors.nome.message}</span>}
              </>
            )}
          />

          <label htmlFor="tipo" className={labelClass}>Tipo</label>
          <Controller
            name="tipo"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <>
                <select className={inputClass} id="tipo" {...field}>
                  <option value=""></option>
                  <option value="Pública">Pública</option>
                  <option value="Particular">Particular</option>
                </select>
                {errors.tipo && <span className={errorClass}>{errors.tipo.message}</span>}
              </>
            )}
          />

          <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">Endereço</h2>
          
          <label htmlFor="cep" className={labelClass}>CEP</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Controller
                name="cep"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <>
                    <input
                      className={inputClass}
                      id="cep"
                      type="text"
                      placeholder="16401-320"
                      {...field}
                    />
                    {errors.cep && <span className={errorClass}>{errors.cep.message}</span>}
                  </>
                )}
              />
            </div>
            <Button type="button" variant="secondary" disabled>
              Buscar
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <div>
              <label htmlFor="logradouro" className={labelClass}>Logradouro</label>
              <Controller
                name="logradouro"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <>
                    <input
                      className={inputClass}
                      id="logradouro"
                      type="text"
                      placeholder="Rua Santos Dumont"
                      {...field}
                    />
                    {errors.logradouro && <span className={errorClass}>{errors.logradouro.message}</span>}
                  </>
                )}
              />
            </div>

            <div>
              <label htmlFor="numero" className={labelClass}>Número</label>
              <Controller
                name="numero"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <>
                    <input className={inputClass} id="numero" type="text" placeholder="551" {...field} />
                    {errors.numero && <span className={errorClass}>{errors.numero.message}</span>}
                  </>
                )}
              />
            </div>

            <div>
              <label htmlFor="complemento" className={labelClass}>Complemento</label>
              <Controller
                name="complemento"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <input className={inputClass} id="complemento" type="text" {...field} />
                    {errors.complemento && <span className={errorClass}>{errors.complemento.message}</span>}
                  </>
                )}
              />
            </div>

            <div>
              <label htmlFor="bairro" className={labelClass}>Bairro</label>
              <Controller
                name="bairro"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <>
                    <input
                      className={inputClass}
                      id="bairro"
                      type="text"
                      placeholder="Bairro"
                      {...field}
                    />
                    {errors.bairro && <span className={errorClass}>{errors.bairro.message}</span>}
                  </>
                )}
              />
            </div>

            <div>
              <label htmlFor="cidade" className={labelClass}>Cidade</label>
              <Controller
                name="cidade"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <>
                    <input className={inputClass} id="cidade" type="text" placeholder="Lins" {...field} />
                    {errors.cidade && <span className={errorClass}>{errors.cidade.message}</span>}
                  </>
                )}
              />
            </div>

            <div>
               <label htmlFor="estado" className={labelClass}>Estado</label>
              <Controller
                name="estado"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <>
                    <input className={inputClass} id="estado" type="text" placeholder="SP" {...field} />
                    {errors.estado && <span className={errorClass}>{errors.estado.message}</span>}
                  </>
                )}
              />
            </div>
          </div>

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

export default AtualizarEscola;
