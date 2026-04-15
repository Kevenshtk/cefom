import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { TerritoriosContext } from '../../../context/territorios';

const DetailField = ({ label, value }) => (
  <div className="flex flex-col mb-4">
    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{label}</span>
    <span className="text-sm font-medium text-text-primary">{value || '-'}</span>
  </div>
);

const DetalhesTerritorio = () => {
  const { id } = useParams();
  const { item, getById } = useContext(TerritoriosContext);

  useEffect(() => {
    getById(id);
  }, [id, getById]);

  if (!item) {
    return <p className="text-center text-text-secondary py-8">Carregando...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link to="/territorios" className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
        <i className="fa-solid fa-arrow-left" /> Voltar
      </Link>

      <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Detalhes do Território</h1>
          <Link 
            to={`/territorios/atualizar/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-blue-700 transition-colors bg-surface-2 px-4 py-2 rounded-md"
          >
            <i className="fa-solid fa-pen" /> Atualizar
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mb-4 mt-8">Identificação</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <DetailField label="ID do Território" value={item?.idTerritorio} />
          <DetailField label="Nome" value={item?.territorio} />
        </div>

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mb-4 mt-8">Bairros</h2>
        <ul className="flex flex-col gap-2 border border-border bg-background rounded-md p-4">
          {item?.bairros?.map((bairro) => (
            <li key={bairro} className="text-sm text-text-primary border-b border-border last:border-0 pb-2 mb-2 last:mb-0 last:pb-0">
              <i className="fa-solid fa-location-dot text-text-secondary mr-2" /> {bairro}
            </li>
          ))}
          {!item?.bairros?.length && <p className="text-sm text-text-secondary">Nenhum bairro registrado.</p>}
        </ul>
      </div>
    </div>
  );
};

export default DetalhesTerritorio;
