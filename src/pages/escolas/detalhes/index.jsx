import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { EscolasContext } from '../../../context/escolas';

const DetalhesEscola = () => {
  const { id } = useParams();
  const { item, getById } = useContext(EscolasContext);

  useEffect(() => {
    getById(id);
  }, [id, getById]);

  if (!item) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h1>Detalhes da Escola</h1>
      <Link to="/escolas">Voltar</Link>

      <h2>Identificação</h2>
      <Link to={`/escolas/atualizar/${id}`}>Atualizar</Link>
      <span>Id: {item?.idEscola}</span>
      <span>Nome: {item?.nome}</span>
      <span>Tipo: {item?.tipo}</span>
      <h2>Endereço</h2>
      <span>CEP: {item?.endereco?.cep}</span>
      <br />
      <span>Logradouro: {item?.endereco?.logradouro}</span>
      <br />
      <span>Número: {item?.endereco?.numero}</span>
      <br />
      <span>Complemento: {item?.endereco?.complemento}</span>
      <br />
      <span>Bairro: {item?.endereco?.bairro}</span>
      <br />
      <span>Cidade: {item?.endereco?.cidade}</span>
      <br />
      <span>Território: {item?.endereco?.territorio}</span>
    </>
  );
};

export default DetalhesEscola;
