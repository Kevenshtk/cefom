import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TerritoriosContext } from '../../../context/territorios';

import Swal from 'sweetalert2';

import ListPageLayout from '../../../components/ListPageLayout';
import DataTable from '../../../components/DataTable';
import Pagination from '../../../components/Pagination';

const Territorios = () => {
  const { territorios, deletarTerritorio, page, setPage, totalPages } = useContext(TerritoriosContext);

  const alertDelete = (id) => {
    Swal.fire({
      title: 'Deseja excluir o registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Não, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        deletarTerritorio(id);
      }
    });
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

            <button onClick={() => alertDelete(item.idTerritorio)}>
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
