import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { EscolasContext } from '../../../context/escolas';

const DetailField = ({ label, value }) => (
  <div className="flex flex-col mb-4">
    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{label}</span>
    <span className="text-sm font-medium text-text-primary">{value || '-'}</span>
  </div>
);

const DetalhesEscola = () => {
  const { id } = useParams();
  const { item, getById } = useContext(EscolasContext);

  useEffect(() => {
    getById(id);
  }, [id, getById]);

  if (!item) {
    return <p className="text-center text-text-secondary py-8">Carregando...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link to="/escolas" className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
        <i className="fa-solid fa-arrow-left" /> Voltar
      </Link>

      <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-sm border border-border">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Detalhes da Escola</h1>
          <Link 
            to={`/escolas/atualizar/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-blue-700 transition-colors bg-surface-2 px-4 py-2 rounded-md"
          >
            <i className="fa-solid fa-pen" /> Atualizar
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mb-4 mt-8">Identificação</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <DetailField label="ID da Escola" value={item?.idEscola} />
          <DetailField label="Nome" value={item?.nome} />
          <DetailField label="Tipo" value={item?.tipo} />
        </div>

        <h2 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mb-4 mt-8">Endereço</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <DetailField label="CEP" value={item?.endereco?.cep} />
          <DetailField label="Logradouro" value={item?.endereco?.logradouro} />
          <DetailField label="Número" value={item?.endereco?.numero} />
          <DetailField label="Complemento" value={item?.endereco?.complemento} />
          <DetailField label="Bairro" value={item?.endereco?.bairro} />
          <DetailField label="Cidade" value={item?.endereco?.cidade} />
          <DetailField label="Território" value={item?.endereco?.territorio} />
        </div>
      </div>
    </div>
  );
};

export default DetalhesEscola;
