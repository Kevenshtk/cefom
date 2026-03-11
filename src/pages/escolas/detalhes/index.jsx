import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { EscolasContext } from '../../../context/escolas';

const DetalhesEscola = () => {
  const { id } = useParams();
  const { escola, buscarEscolaPorId } = useContext(EscolasContext);

  useEffect(() => {
    buscarEscolaPorId(id);
  }, [id, buscarEscolaPorId]);

  if (!escola) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h1>Detalhes da Escola</h1>
      <Link to="/escolas">Voltar</Link>

      <h2>Identificação</h2>
      <Link to={`/escolas/atualizar/${id}`}>Atualizar</Link>
      <span>Id: {escola?.idEscola}</span>
      <span>Nome: {escola?.nome}</span>
      <span>Tipo: {escola?.tipo}</span>
      <h2>Endereço</h2>
      <span>CEP: {escola?.endereco?.cep}</span>
      <br />
      <span>Logradouro: {escola?.endereco?.logradouro}</span>
      <br />
      <span>Número: {escola?.endereco?.numero}</span>
      <br />
      <span>Complemento: {escola?.endereco?.complemento}</span>
      <br />
      <span>Bairro: {escola?.endereco?.bairro}</span>
      <br />
      <span>Cidade: {escola?.endereco?.cidade}</span>
      <br />
      <span>Território: {escola?.endereco?.territorio}</span>
    </>
  );
};

export default DetalhesEscola;
