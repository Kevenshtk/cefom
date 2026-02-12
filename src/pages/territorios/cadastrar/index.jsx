import { Link } from 'react-router-dom';

const CadastroTerritorio = () => {
  return (
    <>
      <h1>Cadastro de Território</h1>
      <Link to="/territorios">Voltar</Link>
      <h2>Identificação</h2>

      <form action="">
        <label htmlFor="">Data do Cadastro</label>
        <input type="date" name="" id="" />

        <label htmlFor="">Nome do Território</label>
        <input type="text" name="" id="" />

        <button>Salvar</button>
      </form>
    </>
  );
};

export default CadastroTerritorio;
