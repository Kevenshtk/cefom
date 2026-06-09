import { Controller } from 'react-hook-form';
import { Input, Select, FileInput } from '../../Input';

const IdentificacaoSection = ({ control, errors }) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
        Identificação
      </h2>

      <Controller
        name="foto"
        control={control}
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FileInput
            label="Foto do Adolescente"
            error={errors.foto?.message}
            value={value}
            onChange={onChange}
            {...fieldProps}
          />
        )}
      />

      <Controller
        name="nome"
        control={control}
        defaultValue=""
        rules={{ required: 'Campo obrigatório' }}
        render={({ field }) => (
          <Input
            label="Nome"
            placeholder="Dom Henrique Mourão"
            error={errors.nome?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="dataNascimento"
        control={control}
        render={({ field }) => (
          <Input
            label="Data de Nascimento"
            type="date"
            error={errors.dataNascimento?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="genero"
        control={control}
        defaultValue=""
        rules={{ required: 'Campo obrigatório' }}
        render={({ field }) => (
          <Select
            label="Gênero"
            error={errors.genero?.message}
            {...field}
          >
            <option value=""></option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </Select>
        )}
      />
    </>
  );
};

export default IdentificacaoSection;
