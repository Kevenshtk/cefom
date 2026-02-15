import { Link } from 'react-router-dom';

const Table = ({ data, del }) => {
  
  if (!data) {
    return <p>{'Erro ao carregar dados.'}</p>;
  }

  return (
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
              <Link to={`/territorios/detalhes/${item.idTerritorio}`}>Detalhes</Link>
              <Link to={`/territorios/atualizar/${item.idTerritorio}`}>Editar</Link>
              <button onClick={() => del(item.idTerritorio)}>Deletar</button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
