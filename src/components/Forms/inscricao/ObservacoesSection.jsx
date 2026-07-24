import { Controller } from 'react-hook-form';
import { Input } from '../../Input';

const ObservacoesSection = ({ control, errors }) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
        Observações
      </h2>

      <Controller
        name="observacoes"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            placeholder="Encaminhado pelo CRAS"
            error={errors.observacoes?.message}
            {...field}
          />
        )}
      />
    </>
  );
};

export default ObservacoesSection;
