import { Link } from 'react-router-dom';

const Table = ({ data, action }) => {
  if (!data) return null;
  
  if (data.status !== 200) {
    return <p>{data.message || 'Erro ao carregar dados.'}</p>;
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
        {data.data?.map((item) => (
          <tr key={item.idTerritorio}>
            <td>{item.idTerritorio}</td>
            <td>{item.territorio}</td>
            <td><Link to={`/territorios/detalhes/${item.idTerritorio}`}>Detalhes</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
