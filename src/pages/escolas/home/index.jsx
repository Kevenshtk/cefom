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
          <>
            <Link to={`/escolas/detalhes/${item.idEscola}`}>Detalhes</Link>

            <Link to={`/escolas/atualizar/${item.idEscola}`}>Editar</Link>

            <button onClick={() => handleDelItem(item.idEscola)}>Deletar</button>
          </>
        )}
      />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </ListPageLayout>
  );
};

export default Escolas;
