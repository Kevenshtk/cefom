import { Link } from 'react-router-dom';

const DetalhesTerritorio = () => {
  return (
    <>
      <h1>Detalhes do Território</h1>
      <Link to="/territorios">Voltar</Link>

      <h2>Identificação</h2>
      <Link to="/territorios/atualizar/1">Atualizar</Link>
      <span>Id: </span>
      <span>Nome: </span>
      <span>Bairro: </span>
    </>
  );
};

export default DetalhesTerritorio;
