import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TerritoriosContext } from '../../../context/territorios';

import alert from '../../../utils/alert';

import ListPageLayout from '../../../components/ListPageLayout';
import DataTable from '../../../components/DataTable';
import Pagination from '../../../components/Pagination';

const Territorios = () => {
  const { items, remove, page, setPage, totalPages } =
    useContext(TerritoriosContext);

  const handleDelItem = async (id) => {
    const result = await alert.delete();

    if (result) remove(id);
  };

  return (
    <ListPageLayout
      title="Lista de Territórios"
      createLink="/territorios/cadastro"
    >
      <DataTable
        data={items}
        columns={[
          { header: 'ID', accessor: 'idTerritorio' },
          { header: 'Nome', accessor: 'territorio' },
        ]}
        renderActions={(item) => (
          <div className="flex items-center justify-end gap-3">
            <Link 
              to={`/territorios/detalhes/${item.idTerritorio}`}
              className="text-primary hover:underline font-medium transition-colors text-sm"
            >
              Detalhes
            </Link>

            <Link 
              to={`/territorios/atualizar/${item.idTerritorio}`}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              Editar
            </Link>

            <button 
              onClick={() => handleDelItem(item.idTerritorio)}
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

export default Territorios;
