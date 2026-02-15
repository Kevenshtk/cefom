import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { TerritoriosContext } from '../../../context/territorios';

const DetalhesTerritorio = () => {
  const { id } = useParams();
  const { territorio, buscarTerritorioPorId } = useContext(TerritoriosContext);

  useEffect(() => {
    buscarTerritorioPorId(id);
  }, []);


  return (
    <>
      <h1>Detalhes do Território</h1>
      <Link to="/territorios">Voltar</Link>

      <h2>Identificação</h2>
      <Link to={`/territorios/atualizar/${id}`}>Atualizar</Link>
      <span>Id: {territorio?.idTerritorio}</span>
      <span>Nome: {territorio?.territorio}</span>
      <span>Bairros: </span>
    </>
  );
};

export default DetalhesTerritorio;
