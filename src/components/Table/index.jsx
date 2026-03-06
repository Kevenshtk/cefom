import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {TerritoriosContext} from '../../context/territorios';

const Table = ({ data, del }) => {
  const { page, setPage, totalPages } = useContext(TerritoriosContext);

  if (!data) {
    return <p>{'Erro ao carregar dados.'}</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.idTerritorio}>
              <td>{item.idTerritorio}</td>
              <td>{item.territorio}</td>
              <td>
                <Link to={`/territorios/detalhes/${item.idTerritorio}`}>
                  Detalhes
                </Link>
                <Link to={`/territorios/atualizar/${item.idTerritorio}`}>
                  Editar
                </Link>
                <button onClick={() => del(item.idTerritorio)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button disabled={page === 0} onClick={() => setPage((prev) => prev - 1)}>
        Anterior
      </button>

      <span>
        Página {page + 1} de {totalPages}
      </span>

      <button
        disabled={page + 1 >= totalPages}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Próxima
      </button>
    </>
  );
};

export default Table;
