import { useForm, Controller } from 'react-hook-form';

import { useCep } from '../../hooks/useCep';
import Button from '../../components/Button';

const Inscricao = () => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const { getCep } = useCep();

  const handleCep = async (cep) => {
    const result = await getCep(cep);

    if (result) {
      const { cep, bairro, localidade, uf, logradouro } = result;
      setValue('cep', cep);
      setValue('bairro', bairro);
      setValue('cidade', localidade);
      setValue('estado', uf);
      setValue('logradouro', logradouro);
    }
  };

  const inputClass =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:bg-surface-2 disabled:text-text-secondary';
  const labelClass = 'block text-sm font-medium text-text-primary mb-1 mt-4';
  const errorClass = 'text-red-500 text-xs mt-1 block';

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Cadastrar Inscrição
      </h1>

      <form className="mt-6">
        <label htmlFor="cpf" className={labelClass}>
          CPF
        </label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Controller
              name="cpf"
              control={control}
              defaultValue=""
              rules={{ required: 'Campo obrigatório' }}
              render={({ field }) => (
                <>
                  <input
                    className={inputClass}
                    id="cpf"
                    type="text"
                    placeholder="16401-320"
                    {...field}
                  />
                  {errors.cpf && (
                    <span className={errorClass}>{errors.cpf.message}</span>
                  )}
                </>
              )}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleCep(getValues('cep'))}
          >
            Buscar
          </Button>
        </div>

        <label htmlFor="data-inscricao" className={labelClass}>
          Data da Inscrição
        </label>
        <Controller
          name="data-inscricao"
          control={control}
          render={({ field }) => (
            <input
              className={inputClass}
              id="data-inscricao"
              type="date"
              {...field}
            />
          )}
        />

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
          Identificação
        </h2>

        <label htmlFor="foto" className={labelClass}>
          Foto do Adolescente
        </label>

        <label htmlFor="nome" className={labelClass}>
          Nome
        </label>
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
              {errors.nome && (
                <span className={errorClass}>{errors.nome.message}</span>
              )}
            </>
          )}
        />

        <label htmlFor="data-nascimento" className={labelClass}>
          Data de Nascimento
        </label>
        <Controller
          name="data-nascimento"
          control={control}
          render={({ field }) => (
            <input
              className={inputClass}
              id="data-nascimento"
              type="date"
              {...field}
            />
          )}
        />

        <label htmlFor="genero" className={labelClass}>
          Gênero
        </label>
        <Controller
          name="genero"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <select className={inputClass} id="genero" {...field}>
                <option value=""></option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
              {errors.genero && (
                <span className={errorClass}>{errors.genero.message}</span>
              )}
            </>
          )}
        />

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
          Endereço
        </h2>

        <label htmlFor="cep" className={labelClass}>
          CEP
        </label>
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
                  {errors.cep && (
                    <span className={errorClass}>{errors.cep.message}</span>
                  )}
                </>
              )}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleCep(getValues('cep'))}
          >
            Buscar
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <div>
            <label htmlFor="logradouro" className={labelClass}>
              Logradouro
            </label>
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
                  {errors.logradouro && (
                    <span className={errorClass}>
                      {errors.logradouro.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label htmlFor="numero" className={labelClass}>
              Número
            </label>
            <Controller
              name="numero"
              control={control}
              defaultValue=""
              rules={{ required: 'Campo obrigatório' }}
              render={({ field }) => (
                <>
                  <input
                    className={inputClass}
                    id="numero"
                    type="text"
                    placeholder="551"
                    {...field}
                  />
                  {errors.numero && (
                    <span className={errorClass}>{errors.numero.message}</span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label htmlFor="complemento" className={labelClass}>
              Complemento
            </label>
            <Controller
              name="complemento"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    className={inputClass}
                    id="complemento"
                    type="text"
                    {...field}
                  />
                  {errors.complemento && (
                    <span className={errorClass}>
                      {errors.complemento.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label htmlFor="bairro" className={labelClass}>
              Bairro
            </label>
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
                  {errors.bairro && (
                    <span className={errorClass}>{errors.bairro.message}</span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label htmlFor="cidade" className={labelClass}>
              Cidade
            </label>
            <Controller
              name="cidade"
              control={control}
              defaultValue=""
              rules={{ required: 'Campo obrigatório' }}
              render={({ field }) => (
                <>
                  <input
                    className={inputClass}
                    id="cidade"
                    type="text"
                    placeholder="Lins"
                    {...field}
                  />
                  {errors.cidade && (
                    <span className={errorClass}>{errors.cidade.message}</span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label htmlFor="estado" className={labelClass}>
              Estado
            </label>
            <Controller
              name="estado"
              control={control}
              defaultValue=""
              rules={{ required: 'Campo obrigatório' }}
              render={({ field }) => (
                <>
                  <input
                    className={inputClass}
                    id="estado"
                    type="text"
                    placeholder="SP"
                    {...field}
                  />
                  {errors.estado && (
                    <span className={errorClass}>{errors.estado.message}</span>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
          Escolaridade
        </h2>

        <label htmlFor="escola" className={labelClass}>
          Escola
        </label>
        <Controller
          name="escola"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="escola"
                type="text"
                placeholder="Selecione uma escola"
                {...field}
              />
              {errors.escola && (
                <span className={errorClass}>{errors.escola.message}</span>
              )}
            </>
          )}
        />

        <label htmlFor="serie" className={labelClass}>
          Série
        </label>
        <Controller
          name="serie"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="serie"
                type="text"
                placeholder="9º ano"
                {...field}
              />
              {errors.serie && (
                <span className={errorClass}>{errors.serie.message}</span>
              )}
            </>
          )}
        />

        <label htmlFor="periodo" className={labelClass}>
          Período
        </label>
        <Controller
          name="periodo"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="periodo"
                type="text"
                placeholder="Manhã"
                {...field}
              />
              {errors.periodo && (
                <span className={errorClass}>{errors.periodo.message}</span>
              )}
            </>
          )}
        />

        <label htmlFor="ra" className={labelClass}>
          RA Escolar
        </label>
        <Controller
          name="ra"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="ra"
                type="text"
                placeholder="000.000.000-0"
                {...field}
              />
              {errors.ra && (
                <span className={errorClass}>{errors.ra.message}</span>
              )}
            </>
          )}
        />

        <label htmlFor="curso" className={labelClass}>
          Curso
        </label>
        <Controller
          name="curso"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="curso"
                type="text"
                placeholder="Curso"
                {...field}
              />
              {errors.curso && (
                <span className={errorClass}>{errors.curso.message}</span>
              )}
            </>
          )}
        />

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
          Telefones
        </h2>

        <label htmlFor="tel_adolescente" className={labelClass}>
          Adolescente
        </label>
        <Controller
          name="tel_adolescente"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="tel_adolescente"
                type="text"
                placeholder="(00) 00000-0000"
                {...field}
              />
              {errors.tel_adolescente && (
                <span className={errorClass}>
                  {errors.tel_adolescente.message}
                </span>
              )}
            </>
          )}
        />

        <label htmlFor="tel_responsavel" className={labelClass}>
          Responsável
        </label>
        <Controller
          name="tel_responsavel"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="tel_responsavel"
                type="text"
                placeholder="(00) 00000-0000"
                {...field}
              />
              {errors.tel_responsavel && (
                <span className={errorClass}>
                  {errors.tel_responsavel.message}
                </span>
              )}
            </>
          )}
        />

        <label htmlFor="tel_extra" className={labelClass}>
          Extra
        </label>
        <Controller
          name="tel_extra"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="tel_extra"
                type="text"
                placeholder="(00) 00000-0000"
                {...field}
              />
              {errors.tel_extra && (
                <span className={errorClass}>{errors.tel_extra.message}</span>
              )}
            </>
          )}
        />

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
          Observações
        </h2>

        <Controller
          name="observacoes"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <>
              <input
                className={inputClass}
                id="observacoes"
                type="text"
                placeholder="Encaminhado pelo CRAS"
                {...field}
              />
              {errors.observacoes && (
                <span className={errorClass}>{errors.observacoes.message}</span>
              )}
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
  );
};

export default Inscricao;
