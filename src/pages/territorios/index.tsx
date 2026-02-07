import Button from '../../components/Button';
import Table from '../../components/Table';

import getTerritorios from '../../services/territorios'

const Territorios = () => {
    const hadleGetTeste = async() => {
        const dados = await getTerritorios();
        console.log(dados);
    }

  return (
    <>
      <h1>Lista de Territórios</h1>
      <Button className="btn-primary" text="Cadastrar Território" onClick={() => hadleGetTeste()} />
      <Table />
    </>
  );
};

export default Territorios;
