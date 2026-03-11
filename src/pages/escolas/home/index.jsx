import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { EscolasContext } from '../../../context/escolas';

import Swal from 'sweetalert2';

import ListPageLayout from '../../../components/ListPageLayout';
import DataTable from '../../../components/DataTable';
import Pagination from '../../../components/Pagination';

const Escolas = () => {
  const { escolas, deletarEscola, page, setPage, totalPages } =
    useContext(EscolasContext);

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
        deletarEscola(id);
      }
    });
  };

  return (
    <ListPageLayout title="Lista de Escolas" createLink="/escolas/cadastro">
      <DataTable
        data={escolas}
        columns={[
          { header: 'ID', accessor: 'idEscola' },
          { header: 'Nome', accessor: 'nome' },
        ]}
        renderActions={(item) => (
          <>
            <Link to={`/escolas/detalhes/${item.idEscola}`}>
              Detalhes
            </Link>

            <Link to={`/escolas/atualizar/${item.idEscola}`}>
              Editar
            </Link>

            <button onClick={() => alertDelete(item.idEscola)}>Deletar</button>
          </>
        )}
      />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </ListPageLayout>
  );
};

export default Escolas;
