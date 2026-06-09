import { Controller } from 'react-hook-form';
import { Input } from '../../Input';

const TelefonesSection = ({ control, errors }) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
        Telefones
      </h2>

      <Controller
        name="telAdolescente"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="Adolescente"
            placeholder="(00) 00000-0000"
            error={errors.telAdolescente?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="telResponsavel"
        control={control}
        defaultValue=""
        rules={{ required: 'Campo obrigatório' }}
        render={({ field }) => (
          <Input
            label="Responsável"
            placeholder="(00) 00000-0000"
            error={errors.telResponsavel?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="telExtra"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="Extra"
            placeholder="(00) 00000-0000"
            error={errors.telExtra?.message}
            {...field}
          />
        )}
      />
    </>
  );
};

export default TelefonesSection;
