import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TerritoriosContext } from '../../../context/territorios';

import Table from '../../../components/Table';

const Territorios = () => {
  const { territorios, deletarTerritorio } = useContext(TerritoriosContext);

  return (
    <>
      <h1>Lista de Territórios</h1>
      <Link to="/territorios/cadastro">Cadastrar Território</Link>
      <Table data={territorios} del={deletarTerritorio}/>
    </>
  );
};

export default Territorios;
