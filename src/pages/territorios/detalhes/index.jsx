import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { TerritoriosContext } from '../../../context/territorios';

const DetalhesTerritorio = () => {
  const { id } = useParams();
  const { item, getById } = useContext(TerritoriosContext);

  useEffect(() => {
    getById(id);
  }, [id, getById]);

  if (!item) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h1>Detalhes do Território</h1>
      <Link to="/territorios">Voltar</Link>

      <h2>Identificação</h2>
      <Link to={`/territorios/atualizar/${id}`}>Atualizar</Link>
      <span>Id: {item?.idTerritorio}</span>
      <span>Nome: {item?.territorio}</span>
      <span>Bairros:</span>
      <ul>
        {item?.bairros?.map((bairro) => (
          <li key={bairro}>{bairro}</li>
        ))}
      </ul>
    </>
  );
};

export default DetalhesTerritorio;
