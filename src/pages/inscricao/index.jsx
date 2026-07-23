import { useForm, Controller } from 'react-hook-form';

import inscricaoService from '../../services/inscricao';
import EnderecoSection from '../../components/Forms/inscricao/EnderecoSection';
import EscolaridadeSection from '../../components/Forms/inscricao/EscolaridadeSection';
import IdentificacaoSection from '../../components/Forms/inscricao/IdentificacaoSection';
import TelefonesSection from '../../components/Forms/inscricao/TelefonesSection';
import ObservacoesSection from '../../components/Forms/inscricao/ObservacoesSection';
import Button from '../../components/Button';
import { Input } from '../../components/Input';

import { useCep } from '../../hooks/useCep';
import { useCpf } from '../../hooks/useCpf';
import alert from '../../utils/alert';

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
  const { getCpf, loading } = useCpf();

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

  const handleCpf = async (cpf) => {
    if (!cpf) {
      alert.error('Por favor, insira um CPF para buscar.');
      return;
    }
    
    const result = await getCpf(cpf);

    if(!result.success) {
      // alert.error(result.message); - precisa corrigir a mensagem de erro
      alert.error('Erro ao buscar CPF. Tente novamente mais tarde.');
      return;
    }

    if (result.status === 'ATIVO') {
      alert.info(result.message);
      return;
    }

    if (result.status === 'CRIAR') {
      alert.success(result.message);

      const info = result.data;

      reset({
        cpf: cpf,
        nome: info.adolescente.nome,
        dataNascimento: info.adolescente.dataNascimento,
        genero: info.adolescente.genero,

        cep: info.endereco.cep,
        logradouro: info.endereco.logradouro,
        numero: info.endereco.numero,
        complemento: info.endereco.complemento,
        bairro: info.endereco.bairro,
        cidade: info.endereco.cidade,
        estado: info.endereco.uf,

        idEscola: info.escolaridade.idEscola,
        escola: info.escolaridade.escola,
        serie: info.escolaridade.serie,
        periodo: info.escolaridade.periodo,
        ra: info.escolaridade.ra,
        curso: info.escolaridade.curso,

        telAdolescente: info.telefones.adolescente,
        telResponsavel: info.telefones.responsavel,
        telExtra: info.telefones.extra,
      });
    }
  };

  const onSubmit = async (data) => {
    const result = await inscricaoService.add(data, data.foto);

    console.log(data);
  };

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        Cadastrar Inscrição
      </h1>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Controller
              name="cpf"
              control={control}
              defaultValue=""
              rules={{ required: 'Campo obrigatório' }}
              render={({ field }) => (
                <Input
                  label="CPF"
                  maxLength={11}
                  placeholder="xxx.xxx.xxx-xx"
                  error={errors.cpf?.message}
                  {...field}
                />
              )}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            className={errors.cpf ? 'mb-5' : 'mb-0.5'}
            onClick={() => handleCpf(getValues('cpf'))}
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>

        <Controller
          name="dataInscricao"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <Input
              label="Data da Inscrição"
              type="date"
              error={errors.dataInscricao?.message}
              {...field}
            />
          )}
        />

        <IdentificacaoSection
          control={control}
          errors={errors}
        />

        <EnderecoSection
          control={control}
          errors={errors}
          getValues={getValues}
          handleCep={handleCep}
        />

        <EscolaridadeSection
          control={control}
          errors={errors}
        />

        <TelefonesSection
          control={control}
          errors={errors}
        />

        <ObservacoesSection
          control={control}
          errors={errors}
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
