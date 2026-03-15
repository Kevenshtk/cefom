import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TerritoriosContext } from '../../../context/territorios';

import alert from '../../../utils/alert';

import ListPageLayout from '../../../components/ListPageLayout';
import DataTable from '../../../components/DataTable';
import Pagination from '../../../components/Pagination';

const Territorios = () => {
  const { territorios, deletarTerritorio, page, setPage, totalPages } =
    useContext(TerritoriosContext);

  const handleDelItem = async (id) => {
    const result = await alert.delete();

    if (result) deletarTerritorio(id);
  };

  return (
    <ListPageLayout
      title="Lista de Territórios"
      createLink="/territorios/cadastro"
    >
      <DataTable
        data={territorios}
        columns={[
          { header: 'ID', accessor: 'idTerritorio' },
          { header: 'Nome', accessor: 'territorio' },
        ]}
        renderActions={(item) => (
          <>
            <Link to={`/territorios/detalhes/${item.idTerritorio}`}>
              Detalhes
            </Link>

            <Link to={`/territorios/atualizar/${item.idTerritorio}`}>
              Editar
            </Link>

            <button onClick={() => handleDelItem(item.idTerritorio)}>
              Deletar
            </button>
          </>
        )}
      />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </ListPageLayout>
  );
};

export default Territorios;
