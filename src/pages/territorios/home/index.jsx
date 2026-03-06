import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TerritoriosContext } from '../../../context/territorios';

import Swal from 'sweetalert2';
import Table from '../../../components/Table';

const Territorios = () => {
  const { territorios, deletarTerritorio } = useContext(TerritoriosContext);

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
        deletarTerritorio(id)
      }
    });
  };

  return (
    <>
      <h1>Lista de Territórios</h1>
      <Link to="/territorios/cadastro">Cadastrar Território</Link>
      <Table data={territorios} del={alertDelete} />
    </>
  );
};

export default Territorios;
