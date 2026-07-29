import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import escolaServices from '../../../services/escolas';
import alert from '../../../utils/alert';
import { Input, Select } from '../../Input';

const EscolaridadeSection = ({ control, errors }) => {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);

  const series = [
    '7º Ano',
    '8º Ano',
    '9º Ano',
    '1º Série',
    '2º Série',
    '3º Série',
  ];
  const periodos = ['Manhã', 'Tarde', 'Noite', 'Integral'];

  useEffect(() => {
    const fetchAllEscolas = async () => {
      try {
        let allEscolas = [];
        let currentPage = 0;
        let hasMore = true;

        while (hasMore) {
          const result = await escolaServices.get(currentPage);

          if (!result.success) {
            alert.error(
              result.message ||
                'Erro ao carregar escolas. Tente novamente mais tarde.'
            );
            break;
          }

          if (result.success && result.data) {
            const content = result.data.content || [];
            allEscolas = [...allEscolas, ...content];

            const totalPages = result.data.totalPages || 1;

            if (currentPage + 1 >= totalPages || content.length === 0) {
              hasMore = false;
            } else {
              currentPage++;
            }
          } else {
            hasMore = false;
          }
        }

        setEscolas(allEscolas);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEscolas();
  }, []);

  return (
    <>
      <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mt-8 mb-4">
        Escolaridade
      </h2>

      <Controller
        name="idEscola"
        control={control}
        defaultValue=""
        rules={{ required: 'Campo obrigatório' }}
        render={({ field }) => (
          <Select
            label="Escola"
            disabled={loading}
            error={errors.idEscola?.message}
            {...field}
          >
            <option value="" disabled>
              {loading ? 'Carregando escolas...' : 'Selecione uma escola'}
            </option>
            {escolas.map((e) => (
              <option key={e.idEscola} value={e.idEscola}>
                {e.nome}
              </option>
            ))}
          </Select>
        )}
      />

      <Controller
        name="serie"
        control={control}
        defaultValue=""
        rules={{ required: 'Campo obrigatório' }}
        render={({ field }) => (
          <Select label="Série" error={errors.serie?.message} {...field}>
            <option value="" disabled>
              Selecione uma série
            </option>
            {series.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        )}
      />

      <Controller
        name="periodo"
        control={control}
        defaultValue=""
        rules={{ required: 'Campo obrigatório' }}
        render={({ field }) => (
          <Select label="Período" error={errors.periodo?.message} {...field}>
            <option value="" disabled>
              Selecione um período
            </option>
            {periodos.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        )}
      />

      <Controller
        name="ra"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="RA Escolar"
            placeholder="000.000.000-0"
            error={errors.ra?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="curso"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="Curso"
            placeholder="Curso"
            error={errors.curso?.message}
            {...field}
          />
        )}
      />
    </>
  );
};

export default EscolaridadeSection;
