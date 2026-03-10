import { Link } from 'react-router-dom';

const ListPageLayout = ({ title, createLink, children }) => {
  return (
    <>
      <h1>{title}</h1>

      <Link to={createLink}>Cadastrar</Link>

      {children}
    </>
  );
};

export default ListPageLayout;