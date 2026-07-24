import { Controller } from 'react-hook-form';
import Button from '../../Button';
import { Input } from '../../Input';

const EnderecoSection = ({
  control,
  errors,
  getValues,
  handleCep,
}) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
        Endereço
      </h2>

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Controller
            name="cep"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <Input
                label="CEP"
                placeholder="16401-320"
                error={errors.cep?.message}
                {...field}
              />
            )}
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          className={errors.cep ? 'mb-5' : 'mb-0.5'}
          onClick={() => handleCep(getValues('cep'))}
        >
          Buscar
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <div>
          <Controller
            name="logradouro"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <Input
                label="Logradouro"
                placeholder="Rua Santos Dumont"
                error={errors.logradouro?.message}
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="numero"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <Input
                label="Número"
                placeholder="551"
                error={errors.numero?.message}
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="complemento"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                label="Complemento"
                error={errors.complemento?.message}
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="bairro"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <Input
                label="Bairro"
                placeholder="Bairro"
                error={errors.bairro?.message}
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="cidade"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <Input
                label="Cidade"
                placeholder="Lins"
                error={errors.cidade?.message}
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="estado"
            control={control}
            defaultValue=""
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <Input
                label="Estado"
                placeholder="SP"
                error={errors.estado?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default EnderecoSection;
