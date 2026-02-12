import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '../../../components/Table';

import getTerritorios from '../../../services/territorios';

const Territorios = () => {
  const [territorios, setTerritorios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dados = await getTerritorios();

      if (dados.status !== 200) {
        alert(dados.message);
        return;
      }

      setTerritorios(dados);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Lista de Territórios</h1>
      <Link to="/territorios/cadastro">Cadastrar Território</Link>
      <Table data={territorios} action="visualizar"/>
    </>
  );
};

export default Territorios;
