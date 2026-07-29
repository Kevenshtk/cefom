import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { EscolasContext } from '../../../context/escolas';

import alert from '../../../utils/alert';

import ListPageLayout from '../../../components/ListPageLayout';
import DataTable from '../../../components/DataTable';
import Pagination from '../../../components/Pagination';

const Escolas = () => {
  const { items, remove, page, setPage, totalPages } =
    useContext(EscolasContext);

  const handleDelItem = async (id) => {
    const result = await alert.delete();

    if (result) remove(id);
  };

  return (
    <ListPageLayout title="Lista de Escolas" createLink="/escolas/cadastro">
      <DataTable
        data={items}
        columns={[
          { header: 'ID', accessor: 'idEscola' },
          { header: 'Nome', accessor: 'nome' },
        ]}
        renderActions={(item) => (
          <div className="flex items-center justify-end gap-3">
            <Link 
              to={`/escolas/detalhes/${item.idEscola}`}
              className="text-primary hover:underline font-medium transition-colors text-sm"
            >
              Detalhes
            </Link>

            <Link 
              to={`/escolas/atualizar/${item.idEscola}`}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              Editar
            </Link>

            <button 
              onClick={() => handleDelItem(item.idEscola)}
              className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
            >
              Deletar
            </button>
          </div>
        )}
      />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </ListPageLayout>
  );
};

export default Escolas;
