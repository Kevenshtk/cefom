import { Link } from 'react-router-dom';

const ListPageLayout = ({ title, createLink, children }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          {title}
        </h1>

        <Link 
          to={createLink}
          className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-4 py-2 shadow-sm bg-primary text-surface hover:opacity-90 focus:ring-primary w-fit"
        >
          <i className="fa-solid fa-plus mr-2" /> Cadastrar
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export default ListPageLayout;